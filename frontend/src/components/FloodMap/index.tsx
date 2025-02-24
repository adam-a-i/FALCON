import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { mockFloodZones } from '../../data/mockFloodData';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import './styles.css';
import { useEffect, useRef, useState } from 'react';
import { civilDefenseLocations } from '../../data/civilDefenseData';

// Fix marker icon issue
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

// Move getRiskColor outside components
const getRiskColor = (level: string) => {
  switch (level) {
    case 'high': return '#ff3b30';
    case 'medium': return '#ff9500';
    case 'low': return '#34c759';
    default: return '#00a8ff';
  }
};

const createPriorityIcon = (priority: number) => {
  const color = priority === 1 ? '#ff3b30' :  // High priority - Red
                priority === 2 ? '#ff9500' :   // Medium priority - Orange
                '#34c759';                     // Low priority - Green

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.5);
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const createEmergencyIcon = () => {
  return L.divIcon({
    className: 'emergency-marker',
    html: `
      <div class="emergency-icon">🚑</div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

const FloodOverlay = () => {
  const map = useMap();
  
  useEffect(() => {
    // Create heatmap data points
    const points = mockFloodZones.flatMap(zone => {
      const points = [];
      const baseIntensity = zone.riskLevel === 'high' ? 1 : 
                           zone.riskLevel === 'medium' ? 0.7 : 0.4;
      
      points.push([zone.latitude, zone.longitude, baseIntensity]);
      
      for (let i = 0; i < 15; i++) {
        const lat = zone.latitude + (Math.random() - 0.5) * 0.02;
        const lng = zone.longitude + (Math.random() - 0.5) * 0.02;
        const intensity = baseIntensity * (1 - Math.random() * 0.3);
        points.push([lat, lng, intensity]);
      }
      
      return points;
    });

    // Create irregular polygons
    mockFloodZones.forEach(zone => {
      const polygonPoints = [];
      const numPoints = 8;
      const baseRadius = zone.riskLevel === 'high' ? 2000 : 
                        zone.riskLevel === 'medium' ? 1500 : 1000;

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * 2 * Math.PI;
        const radius = baseRadius * (1 + (Math.random() - 0.5) * 0.5);
        const lat = zone.latitude + (Math.cos(angle) * radius) / 111300;
        const lng = zone.longitude + (Math.sin(angle) * radius) / (111300 * Math.cos(zone.latitude * Math.PI / 180));
        polygonPoints.push([lat, lng]);
      }
      
      polygonPoints.push(polygonPoints[0]);

      const color = getRiskColor(zone.riskLevel);
      L.polygon(polygonPoints as L.LatLngExpression[], {
        color: color,
        fillColor: color,
        fillOpacity: 0.2,
        weight: 1
      }).addTo(map);
    });

    // Add heatmap layer if available
    if ((L as any).heatLayer) {
      const heat = (L as any).heatLayer(points, {
        radius: 25,
        blur: 15,
        maxZoom: 10,
        gradient: {
          0.4: '#34c759',
          0.6: '#ff9500',
          0.8: '#ff3b30'
        }
      }).addTo(map);
    }

    return () => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Polygon || layer instanceof (L as any).HeatLayer) {
          map.removeLayer(layer);
        }
      });
    };
  }, [map]);

  return null;
};

const generateSummary = (zones: typeof mockFloodZones) => {
  const highRiskCount = zones.filter(z => z.riskLevel === 'high').length;
  const mediumRiskCount = zones.filter(z => z.riskLevel === 'medium').length;
  const lowRiskCount = zones.filter(z => z.riskLevel === 'low').length;

  return `Current Flood Status Summary: There are ${highRiskCount} high-risk areas, ${mediumRiskCount} medium-risk areas, and ${lowRiskCount} low-risk areas. ${
    highRiskCount > 0 ? 'Immediate attention required in ' + zones.filter(z => z.riskLevel === 'high').map(z => z.location).join(', ') + '.' : ''
  }`;
};

const generateInsights = (zones: typeof mockFloodZones) => {
  const highRiskZones = zones.filter(z => z.riskLevel === 'high');
  const urbanZones = highRiskZones.filter(z => z.priority === 1);
  const desertZones = highRiskZones.filter(z => z.priority > 1);

  return {
    immediate: [
      ...urbanZones.map(z => `Evacuate basement levels in ${z.location}`),
      ...desertZones.map(z => `Close desert roads near ${z.location}`),
      'Deploy emergency response teams to high-risk areas',
    ],
    shortTerm: [
      'Activate emergency drainage systems',
      'Alert residents in affected areas via SMS',
      'Prepare emergency shelters',
    ],
    preventive: [
      'Monitor weather radar for additional rainfall',
      'Check infrastructure integrity in affected areas',
      'Prepare sandbags and emergency supplies',
    ]
  };
};

const FloodMap = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure the speech
      utterance.rate = 0.9;  // Slightly slower
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.lang = 'en-US';

      // Add event handlers
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        console.error('Speech synthesis error');
        setIsSpeaking(false);
      };

      // Speak
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser');
    }
  };

  const insights = generateInsights(mockFloodZones);
  const summary = generateSummary(mockFloodZones);

  return (
    <div className="map-container">
      <MapContainer
        center={[24.453884, 54.377343]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FloodOverlay />
        
        {/* Add Civil Defense Markers */}
        {civilDefenseLocations.map((location) => (
          <Marker
            key={`emergency-${location.id}`}
            position={[location.latitude, location.longitude]}
            icon={createEmergencyIcon()}
          >
            <Popup className="custom-popup">
              <h3>{location.name}</h3>
              <p>Emergency Contact: {location.contact}</p>
              <button 
                className="emergency-call-btn"
                onClick={() => window.open(`tel:${location.contact}`)}
              >
                📞 Call Emergency Services
              </button>
            </Popup>
          </Marker>
        ))}

        {mockFloodZones.map((zone) => (
          <Marker 
            key={zone.id}
            position={[zone.latitude, zone.longitude]}
            icon={createPriorityIcon(zone.priority)}
          >
            <Popup className="custom-popup">
              <h3>{zone.location}</h3>
              <div className={`risk-level ${zone.riskLevel}`}>
                Risk Level: {zone.riskLevel.toUpperCase()}
              </div>
              
              <div className="metrics-grid">
                <div className="metric">
                  <label>Rainfall</label>
                  <span>{zone.rainfall}mm/hr</span>
                </div>
                <div className="metric">
                  <label>Water Level</label>
                  <span>{zone.waterLevel}m</span>
                </div>
                <div className="metric">
                  <label>Flow Rate</label>
                  <span>{zone.flowRate}m³/s</span>
                </div>
                <div className="metric">
                  <label>Ground Saturation</label>
                  <span>{zone.groundSaturation}%</span>
                </div>
              </div>

              <div className="prediction-info">
                <h4>AI Prediction</h4>
                <p>{zone.prediction}</p>
              </div>

              <div className="last-updated">
                Last Updated: {new Date(zone.lastUpdate).toLocaleString()}
              </div>

              <div className="historical-data">
                <h4>Historical Context</h4>
                <p>{zone.historicalContext}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <div className="map-controls">
        <button 
          className="summary-btn"
          onClick={() => handleSpeak(summary)}
        >
          {isSpeaking ? '🔊 Stop Speaking' : '🔊 Read Summary'}
        </button>
        <div className="summary-text">
          {summary}
        </div>
        <div className="insights-section">
          <h4>Actionable Insights</h4>
          <div className="insight-category">
            <h5>🚨 Immediate Actions</h5>
            <ul>
              {insights.immediate.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>
          <div className="insight-category">
            <h5>⚡ Short-term Actions</h5>
            <ul>
              {insights.shortTerm.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>
          <div className="insight-category">
            <h5>🔄 Preventive Measures</h5>
            <ul>
              {insights.preventive.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloodMap; 
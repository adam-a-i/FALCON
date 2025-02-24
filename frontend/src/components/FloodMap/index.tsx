import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { mockFloodZones } from '../../data/mockFloodData';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import './styles.css';
import { useEffect, useRef } from 'react';

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

const FloodMap = () => {
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
        {mockFloodZones.map((zone) => (
          <Marker 
            key={zone.id}
            position={[zone.latitude, zone.longitude]}
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
    </div>
  );
};

export default FloodMap; 
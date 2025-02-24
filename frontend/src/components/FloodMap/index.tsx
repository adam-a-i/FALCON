import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { mockFloodZones } from '../../data/mockFloodData';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import './styles.css';

// Fix Leaflet's default icon path issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const FloodMap = () => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return '#ff3b30';
      case 'medium': return '#ff9500';
      case 'low': return '#34c759';
      default: return '#00a8ff';
    }
  };

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
        {mockFloodZones.map((zone) => (
          <div key={zone.id}>
            <Circle
              center={[zone.latitude, zone.longitude]}
              radius={2000}
              pathOptions={{
                color: getRiskColor(zone.riskLevel),
                fillColor: getRiskColor(zone.riskLevel),
                fillOpacity: 0.3
              }}
            />
            <Marker 
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
          </div>
        ))}
      </MapContainer>
    </div>
  );
};

export default FloodMap; 
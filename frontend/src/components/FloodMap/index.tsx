import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
          <Marker 
            key={zone.id} 
            position={[zone.latitude, zone.longitude]}
          >
            <Popup>
              <h3>{zone.location}</h3>
              <p>Risk Level: {zone.riskLevel}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default FloodMap; 
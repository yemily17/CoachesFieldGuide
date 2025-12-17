import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CardComponent from './components/CardComponent';

function MapComponent() {
  const position = [39.8283, -98.5795]; // Center of America

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <MapContainer center={position} zoom={4} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
      <CardComponent />
    </div>
  );
}

export default MapComponent;

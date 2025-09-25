import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './App.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <div className="loading">Loading Google Maps...</div>;
    case Status.FAILURE:
      return <FallbackMap />;
    case Status.SUCCESS:
      return <GoogleMapComponent />;
    default:
      return <FallbackMap />;
  }
};

const GoogleMapComponent = () => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      try {
        const newMap = new window.google.maps.Map(ref.current, {
          center: { lat: -1.2884, lng: 36.8233 }, // Nairobi, Kenya
          zoom: 14,
        });
        setMap(newMap);
      } catch (error) {
        console.error('Google Maps failed to load:', error);
      }
    }
  }, [ref, map]);

  return <div ref={ref} style={{ width: '100%', height: '100vh' }} />;
};

const FallbackMap = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div className="map-header">
        <h3>Map View (OpenStreetMap)</h3>
        <p>Using free OpenStreetMap - No API key required</p>
      </div>
      <MapContainer
        center={[-1.2884, 36.8233]} // Nairobi, Kenya
        zoom={14}
        style={{ height: 'calc(100vh - 80px)', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-1.2884, 36.8233]}>
          <Popup>
            Nairobi, Kenya<br />
            Default location marker
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

const App = () => {
  const apiKey = "AIzaSyBe4KQrcg7h4rNHu9x7rnPwRHxZv2v7Kk8";

  return (
    <div className="App">
      <Wrapper 
        apiKey={apiKey} 
        render={render}
        libraries={['places']}
      />
    </div>
  );
};

export default App;
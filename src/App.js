import React, { useEffect, useRef, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import './App.css';

const TomTomMap = () => {
  const mapElement = useRef();
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = '3f0SKnsBqxRHoegygPl1LM7UjuvQ0DMq';

  useEffect(() => {
    if (mapElement.current && !map) {
      try {
        const ttMap = tt.map({
          key: apiKey,
          container: mapElement.current,
          center: [91.3662, 25.4670], // Shillong, Meghalaya, India [lng, lat]
          zoom: 14,
          style: 'tomtom://vector/1/basic-main'
        });

        // Add marker for Meghalaya
        const marker = new tt.Marker()
          .setLngLat([91.3662, 25.4670])
          .addTo(ttMap);

        // Add popup to marker
        const popup = new tt.Popup({ offset: 35 })
          .setHTML('<div><strong>Shillong, Meghalaya</strong><br/>Capital of Meghalaya, India</div>');
        
        marker.setPopup(popup);

        ttMap.on('load', () => {
          setLoading(false);
        });

        ttMap.on('error', (e) => {
          console.error('TomTom Map error:', e);
          setError('Failed to load TomTom Map');
          setLoading(false);
        });

        setMap(ttMap);

        // Cleanup function
        return () => {
          if (ttMap) {
            ttMap.remove();
          }
        };
      } catch (err) {
        console.error('Error initializing TomTom map:', err);
        setError('Failed to initialize map');
        setLoading(false);
      }
    }
  }, [apiKey, map]);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading TomTom Map...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h3>Map Error</h3>
        <p>{error}</p>
        <p>Please check your TomTom API key and internet connection.</p>
      </div>
    );
  }

  return (
    <div className="map-container">
      <div className="map-header">
        <h2>📍 Meghalaya, India</h2>
        <p>Powered by TomTom Maps</p>
      </div>
      <div ref={mapElement} className="map" />
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <TomTomMap />
    </div>
  );
};

export default App;
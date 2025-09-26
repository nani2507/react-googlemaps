import React, { useEffect, useRef, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import './App.css';

const TomTomMap = () => {
  const mapElement = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);

  // Your TomTom API key
  const apiKey = '3f0SKnsBqxRHoegygPl1LM7UjuvQ0DMq';

  useEffect(() => {
    if (!mapElement.current) return;

    // Initialize map immediately
    const map = tt.map({
      key: apiKey,
      container: mapElement.current,
      center: [91.3662, 25.4670], // Shillong, Meghalaya
      zoom: 12,
      style: 'basic_main'
    });

    // Add marker immediately
    new tt.Marker()
      .setLngLat([91.3662, 25.4670])
      .setPopup(new tt.Popup().setHTML('<strong>Shillong, Meghalaya</strong>'))
      .addTo(map);

    setMapLoaded(true);

    return () => map.remove();
  }, []);

  return (
    <div className="App">
      <div className="map-header">
        <h2>📍 Meghalaya, India - TomTom Maps</h2>
      </div>
      <div ref={mapElement} className="map" />
      {!mapLoaded && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading Map...</p>
        </div>
      )}
    </div>
  );
};

export default TomTomMap;
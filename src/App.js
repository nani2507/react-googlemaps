import React, { useEffect, useRef, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import './App.css';

const TomTomMap = () => {
  const mapElement = useRef();
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_TOMTOM_API_KEY;

  useEffect(() => {
    let ttMap = null;
    
    const initializeMap = async () => {
      if (!mapElement.current || map) return;
      
      setLoading(true);
      
      try {
        ttMap = tt.map({
          key: apiKey,
          container: mapElement.current,
          center: [91.3662, 25.4670],
          zoom: 15,
          style: 'tomtom://vector/1/basic-main',
          stylesVisibility: {
            trafficIncidents: true,
            trafficFlow: true
          },
          dragPan: true,
          scrollZoom: true,
          doubleClickZoom: true,
          keyboard: true
        });

        // Wait for map to load completely before adding markers
        ttMap.on('load', () => {
          // Add marker with better visibility
          const marker = new tt.Marker({
            color: '#FF0000',
            scale: 1.2
          })
            .setLngLat([91.3662, 25.4670])
            .addTo(ttMap);

          const popup = new tt.Popup({ 
            offset: 35,
            closeButton: true,
            closeOnClick: false
          })
            .setHTML('<div><strong>Shillong, Meghalaya</strong><br/>Capital of Meghalaya, India<br/>Zoom: 15 - Streets visible</div>');
          
          marker.setPopup(popup);
          
          // Show popup by default
          popup.addTo(ttMap);
          popup.setLngLat([91.3662, 25.4670]);
        });

        setMap(ttMap);
        setLoading(false);
        
      } catch (err) {
        console.error('Error initializing TomTom map:', err);
        setError('Failed to initialize map');
        setLoading(false);
      }
    };

    // Initialize map immediately
    initializeMap();

    // Cleanup function
    return () => {
      if (ttMap) {
        ttMap.remove();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Initializing Map...</p>
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
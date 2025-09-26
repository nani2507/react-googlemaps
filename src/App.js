import React, { useEffect, useRef, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import './App.css';

const TomTomMap = () => {
  const mapElement = useRef();
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use the API key directly - environment variables can sometimes cause issues
  const apiKey = '3f0SKnsBqxRHoegygPl1LM7UjuvQ0DMq';

  useEffect(() => {
    let ttMap = null;
    
    const initializeMap = async () => {
      if (!mapElement.current || map) return;
      
      // Validate API key first
      if (!apiKey || apiKey.length < 10) {
        setError('Invalid TomTom API key');
        setLoading(false);
        return;
      }
      
      try {
        console.log('Initializing TomTom map with API key:', apiKey.substring(0, 8) + '...');
        
        ttMap = tt.map({
          key: apiKey,
          container: mapElement.current,
          center: [91.3662, 25.4670],
          zoom: 13,
          stylesVisibility: {
            trafficIncidents: true,
            trafficFlow: true
          },
          interactive: true
        });

        // Add error handling for map loading
        ttMap.on('error', (e) => {
          console.error('TomTom map error:', e);
          setError('Map failed to load. Please check your internet connection.');
          setLoading(false);
        });

        // Wait for map to load completely
        ttMap.on('load', () => {
          console.log('TomTom map loaded successfully');
          
          try {
            // Add marker
            const marker = new tt.Marker({
              color: '#FF0000'
            })
              .setLngLat([91.3662, 25.4670])
              .addTo(ttMap);

            // Add popup
            const popup = new tt.Popup({ 
              offset: 35
            })
              .setHTML('<div><strong>Shillong, Meghalaya</strong><br/>Capital of Meghalaya, India</div>');
            
            marker.setPopup(popup);
            
            setLoading(false);
            setMap(ttMap);
            
          } catch (markerError) {
            console.error('Error adding marker:', markerError);
            setLoading(false);
            setMap(ttMap); // Still show map even if marker fails
          }
        });

        // Timeout fallback
        setTimeout(() => {
          if (loading) {
            console.log('Map loading timeout, showing anyway');
            setLoading(false);
            setMap(ttMap);
          }
        }, 10000);
        
      } catch (err) {
        console.error('Error initializing TomTom map:', err);
        setError(`Failed to initialize map: ${err.message}`);
        setLoading(false);
      }
    };

    initializeMap();

    return () => {
      if (ttMap) {
        ttMap.remove();
      }
    };
  }, [apiKey]);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading TomTom Map...</p>
        <p style={{fontSize: '12px', opacity: 0.7}}>This may take a few moments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h3>Map Error</h3>
        <p>{error}</p>
        <p>API Key: {apiKey ? apiKey.substring(0, 8) + '...' : 'Missing'}</p>
        <button onClick={() => window.location.reload()} style={{
          padding: '10px 20px',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px'
        }}>
          Retry
        </button>
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
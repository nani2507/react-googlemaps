import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import './App.css';

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <div>Loading...</div>;
    case Status.FAILURE:
      return <div>Error loading Google Maps</div>;
    case Status.SUCCESS:
      return <MapComponent />;
  }
};

const MapComponent = () => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center: { lat: -1.2884, lng: 36.8233 }, // Nairobi, Kenya
        zoom: 14,
      });
      setMap(newMap);
    }
  }, [ref, map]);

  return <div ref={ref} style={{ width: '100%', height: '100vh' }} />;
};

const App = () => {
  const apiKey = "AIzaSyBe4KQrcg7h4rNHu9x7rnPwRHxZv2v7Kk8";

  if (!apiKey) {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Google Maps API Key Required</h2>
          <p>Please add your Google Maps API key to the .env file</p>
          <code>REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here</code>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Wrapper apiKey={apiKey} render={render} />
    </div>
  );
};

export default App;
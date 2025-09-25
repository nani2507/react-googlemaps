import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'react-googlemaps';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBe4KQrcg7h4rNHu9x7rnPwRHxZv2v7Kk8'
})(MapContainer);
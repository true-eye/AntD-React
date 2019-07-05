import React, { Component } from 'react';
import { googleConfig } from '../../../../settings';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import BasicMapWrapper from './map.style';

class PropertyMap extends Component {
  constructor(props) {
    super(props);
    console.log(props.property);
    this.state = {
      zoom: 16,
      infoWindow: null
    };
  }

  componentDidMount() {
    this.loadMarkers();
  }

  componentWillReceiveProps(nextProps) {
    // if(this.props.listing.id !== nextProps.listing.id){
      this.loadMarkers();
    // }
  }

  loadMarkers = () => {
    this.setState({
      center: { lat: (this.props.property) ? parseFloat(this.props.property.latitude) : 0, lng: (this.props.property) ? parseFloat(this.props.property.longitude) : 0 }, // 40.783060, -73.971249
    });
  };

  render() {
    const { user, property } = this.props;
    return (
      <div>
        {user && property ? (
          <BasicMapWrapper>
            <div id="map"
              className="isoGoogleMap"
              style={{ height: '428px', width: '100%' }}
            >
            <Map google={this.props.google} zoom={15} center={this.state.center}>
              <Marker
                name={property.street_address}
                position={{lat: property.latitude, lng: property.longitude}}
              />
            </Map>
            </div>
          </BasicMapWrapper>
        ) : (
          <span>Map is Loading</span>
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleConfig.apiKey
})(PropertyMap);

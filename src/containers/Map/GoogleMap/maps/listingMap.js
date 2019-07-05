import React, { Component } from 'react';
import { googleConfig } from '../../../../settings';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import BasicMapWrapper from './map.style';
import { connect } from "react-redux";

class ListingMap extends Component {
  constructor(props) {
    super(props);
    console.log(props.listing);
    this.state = {
      zoom: 16,
      infoWindow: null
    };
  }

  componentDidMount() {
    this.loadMarkers(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // if(this.props.listing.id !== nextProps.listing.id){
      this.loadMarkers(nextProps);
    // }
  }

  loadMarkers = (ps) => {
    // console.log(ps);
    this.setState({
      center: { lat: (ps.listing) ? parseFloat(ps.listing.approx_latitude) : 0, lng: (ps.listing) ? parseFloat(ps.listing.approx_longitude) : 0 }, // 40.783060, -73.971249
    });
  };

  render() {
    const { user, listing } = this.props;
    return (
      <div>
        {user && listing ? (
          <BasicMapWrapper>
            <div id="map"
              className="isoGoogleMap"
              style={{ height: '428px', width: '100%' }}
              ref={this.loadMap}
            >
            <Map google={this.props.google} zoom={15} center={this.state.center}>
              <Marker
                name={listing.current_listing_info_snapshot.listing_title}
                position={{lat: listing.approx_latitude, lng: listing.approx_longitude}}
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
})(connect(
  state => ({
  }),
  {  }
)(ListingMap));

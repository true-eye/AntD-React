import React, { Component } from 'react';
import { googleConfig } from '../../../../settings';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import BasicMapWrapper from './map.style';
import MapInfoWindowContent from './mapInfoWindowContent';
import propertiesActions from "../../../../redux/properties/actions";
import { connect } from "react-redux";

const { gotoListingPage } = propertiesActions;
var eventTimeout;

class BasicMarkerMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  componentDidMount() {
    this.loadMarkers(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.user && nextProps.user){
      this.loadMarkers(nextProps);
    } else if(this.props.user && nextProps.user && this.props.user.current_property !== nextProps.user.current_property){
      this.loadMarkers(nextProps);
    }
  }

  loadMarkers = (ps) => {
    // console.log(ps);
    this.setState({
      center: { lat: (ps.user && ps.user.current_property) ? parseFloat(ps.user.current_property.latitude) : 0, lng: (ps.user && ps.user.current_property) ? parseFloat(ps.user.current_property.longitude) : 0 }, // 40.783060, -73.971249
      competition: ps.competition
    });
  };

  onMarkerClick = (props, marker, e) => {
    var cmp = this;
    clearTimeout(eventTimeout);
    eventTimeout = setTimeout(function(){
      cmp.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    },
    100);

  }

  // This is a complete monkey patch to get routing working in React with google maps
  // see this for more info https://github.com/fullstackreact/google-maps-react/issues/202
  renderDomCallback(domElement) {
    const { gotoListingPage } = this.props;

    // console.log("dom element callback", domElement);
    // This is passed down to the InfoWindow
    // TODO: Investigate Portal
    let a = domElement.querySelector("a.listingLink"); // id of Material-UI <Button /> inside of VenueRenderer component
    if (a) {
      a.addEventListener('click', function(){
        gotoListingPage(a.getAttribute("data-id"));
      });
    }
    return domElement;
  }

  render() {
    const { user, competition } = this.props;
    return (
      <div>
        {user && competition ? (
          <BasicMapWrapper>
            <div id="map"
              className="isoGoogleMap"
              style={{ height: '650px', width: '100%' }}
              ref={this.loadMap}
            >
              <Map google={this.props.google} zoom={15} center={this.state.center}>
                <Marker
                  name={user && user.current_property ? user.current_property.street_1 : ''}
                  position={{lat: user && user.current_property ? user.current_property.latitude : 0, lng: user && user.current_property ? user.current_property.longitude : 0}}
                />

                {competition && competition.map(e => (
                    <Marker
                      key={e.id}
                      position={{ lat: parseFloat(e.approx_latitude), lng: parseFloat(e.approx_longitude) }}
                      onClick={this.onMarkerClick}
                      name={e.current_listing_info_snapshot.listing_title}
                      basePrice={e.current_listing_info_snapshot.base_price}
                      bedrooms={e.current_listing_info_snapshot.bedrooms}
                      bathrooms={e.current_listing_info_snapshot.bathrooms}
                      sleeps={e.current_listing_info_snapshot.sleeps}
                      listingId={e.id}
                      icon={{
                        url: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png',
                      }}
                    />
                ))}

                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onCloseClick={() => {this.closeInfoWindow()}}
                  renderDomCallback={this.renderDomCallback.bind(this)}>
                    <MapInfoWindowContent>
                      <div className="isoContentWrapper">
                        <h3>
                          <a className="listingLink" data-id={this.state.selectedPlace.listingId}>{this.state.selectedPlace.name}</a>
                        </h3>
                        <p className="isoLabel">Bedrooms: {this.state.selectedPlace.bedrooms}</p>
                        <p className="isoLabel">Bathrooms: {this.state.selectedPlace.bathrooms}</p>
                        <p className="isoLabel">Sleeps: {this.state.selectedPlace.sleeps}</p>
                        <p className="isoLabel">Base Price: <strong>${this.state.selectedPlace.basePrice}</strong></p>
                      </div>
                    </MapInfoWindowContent>
                </InfoWindow>
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
  { gotoListingPage }
)(BasicMarkerMap));

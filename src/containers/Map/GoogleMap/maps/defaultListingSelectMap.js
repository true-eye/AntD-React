import React, { Component } from 'react';
import { googleConfig } from '../../../../settings';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import BasicMapWrapper from './map.style';
import MapInfoWindowContent from './mapInfoWindowContent';
import settingsActions from "../../../../redux/settings/actions";
import { connect } from "react-redux";
import ImageCellView from '../../../../components/tables/imageCell';
import Button from "../../../../components/uielements/button";

const { setDefaultListing } = settingsActions;

class DefaultListingSelectMap extends Component {
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
    if(this.props.property !== nextProps.property){
      this.loadMarkers(nextProps);
    }
  }

  loadMarkers = (ps) => {
    this.setState({
      center: { lat: (ps.property) ? parseFloat(ps.property.latitude) : 0, lng: (ps.property) ? parseFloat(ps.property.longitude) : 0 },
      competition: ps.competition
    });
  };

  onMarkerClick = (props, marker, e) => {
    console.log(props);

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onInfoClose = () => {
    this.setState({
      selectedPlace: {},
      activeMarker: {},
      showingInfoWindow: false
    });
  }

  // This is a complete monkey patch to get routing working in React with google maps
  // see this for more info https://github.com/fullstackreact/google-maps-react/issues/202
  renderDomCallback(domElement) {
    const { setDefaultListing, user } = this.props;

    // console.log("dom element callback", domElement);
    // This is passed down to the InfoWindow
    // TODO: Investigate Portal
    let a = domElement.querySelector("button.select-listing"); // id of Material-UI <Button /> inside of VenueRenderer component
    if (a) {
      a.addEventListener('click', function(){
        setDefaultListing(a.getAttribute("data-listing-id"), a.getAttribute("data-property-id"), user);
        console.log("clicked");
      });
    }
    return domElement;
  }

  render() {
    const { property, competition } = this.props;
    return (
      <div>
        {property && competition ? (
          <BasicMapWrapper>
            <div id="map"
              className="isoGoogleMap"
              style={{ height: '650px', width: '100%' }}
              ref={this.loadMap}
            >
              <Map google={this.props.google} zoom={15} initialCenter={this.state.center} center={this.state.center}>
                <Marker
                  name={property ? property.street_1 : ''}
                  position={{lat: property ? property.latitude : 0, lng: property ? property.longitude : 0}}
                />

                {competition && competition.map(e => (
                    <Marker
                      key={e.id}
                      position={{ lat: parseFloat(e.approx_latitude), lng: parseFloat(e.approx_longitude) }}
                      onMouseover={this.onMarkerClick}
                      onMouseout={this.onInfoClose}
                      name={e.current_listing_info_snapshot.listing_title}
                      imageUrl={e.picture_1_url}
                      market={e.market.name}
                      listingId={e.id}
                      propertyId={property.id}
                      icon={{
                        url: 'https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png',
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
                        <h4>{this.state.selectedPlace.name}</h4>
                        <ImageCellView src={this.state.selectedPlace.imageUrl} />
                        <p style={{textAlign: "center"}}>
                          <br/><br/>
                          <Button type="primary" size="small" className="select-listing" data-listing-id={this.state.selectedPlace.listingId} data-property-id={this.state.selectedPlace.propertyId}>
                            Select this {this.state.selectedPlace.market}
                          </Button>
                        </p>
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
  { setDefaultListing }
)(DefaultListingSelectMap));

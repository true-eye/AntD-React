import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import PageHeader from "../../components/utility/pageHeader";
import basicStyle from '../../settings/basicStyle';
import listingsActions from "../../redux/listings/actions";
import ContentHolder from "../../components/utility/contentHolder";
import Spin from '../Feedback/Spin/spin.style';
import { Card } from 'antd';
import ListingMap from "../Map/GoogleMap/maps/listingMap";

const { getListing } = listingsActions;

class ListingDetail extends Component {
  componentDidMount() {
    this.loadListing();
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.listing){
      this.loadListing();
    }
  }

  loadListing = () => {
    const { getListing } = this.props;
    getListing(this.props.match.params.id);
  };

  render() {
    const { rowStyle, colStyle, gutter, gridStyle } = basicStyle;
    const {
      user, listing,
    } = this.props;

    return (
      <LayoutWrapper>
        <PageHeader>{listing ? listing.current_listing_info_snapshot.listing_title : "Listing Info"}</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <ContentHolder>
              <Card>
                <h3>
                  <a href={listing ? listing.url : ""} target="_blank">
                    {listing ? listing.current_listing_info_snapshot.listing_title : ""}
                    <i className="ion-android-open" style={{marginLeft: '10px'}}/>
                  </a>
                </h3>
                <h3>{listing ? listing.market.name : ""}</h3>
              </Card>
            </ContentHolder>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Spin spinning={this.props.loadingListing} size="large">
              <ContentHolder>
                <Card title="Property Details">
                  <Card.Grid style={gridStyle}>
                    <div className="isoContentWrapper">
                      <h3 className="isoStatNumber">{listing ? listing.current_listing_info_snapshot.sleeps : ''}</h3>
                      <span className="isoLabel">Sleeps</span>
                    </div>
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <div className="isoContentWrapper">
                      <h3 className="isoStatNumber">{listing ? listing.current_listing_info_snapshot.bedrooms : ''}</h3>
                      <span className="isoLabel">Bedrooms</span>
                    </div>
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <div className="isoContentWrapper">
                      <h3 className="isoStatNumber">{listing ? listing.current_listing_info_snapshot.bathrooms : ''}</h3>
                      <span className="isoLabel">Bathrooms</span>
                    </div>
                  </Card.Grid>
                </Card>
              </ContentHolder>
            </Spin>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Spin spinning={this.props.loadingListing} size="large">
              <ContentHolder>
                <Card title="Property Pricing">
                  <Card.Grid style={gridStyle}>
                    <div className="isoContentWrapper">
                      <h3 className="isoStatNumber">${listing ? listing.current_listing_info_snapshot.base_price : ''}</h3>
                      <span className="isoLabel">Base Price</span>
                    </div>
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <div className="isoContentWrapper">
                      <h3 className="isoStatNumber">${listing ? listing.current_listing_info_snapshot.cleaning_fee : ''}</h3>
                      <span className="isoLabel">Cleaning Fee</span>
                    </div>
                  </Card.Grid>
                </Card>
              </ContentHolder>
            </Spin>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={24} xs={24} style={colStyle}>
            <ContentHolder>
              <Card bodyStyle={{ padding: 0 }} title="Listing Home Photo">
                <div className="custom-image">
                  <img
                    alt="Listing"
                    width="100%"
                    height='100%'
                    src={listing && listing.picture_1_url ? listing.picture_1_url : ''}
                  />
                </div>
              </Card>
            </ContentHolder>
          </Col>
          <Col md={12} sm={24} xs={24} style={colStyle}>
            <Spin spinning={this.props.loadingListing} size="large">
              <ContentHolder>
                <Card bodyStyle={{ padding: 0 }} title="Approximate Location">
                  <ListingMap user={user} listing={listing} />
                </Card>
              </ContentHolder>
            </Spin>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Card title="Amenities">
              {listing && listing.current_listing_info_snapshot.has_pool && (
                <Card.Grid style={gridStyle}>Pool</Card.Grid>
              )}
              {listing && listing.current_listing_info_snapshot.has_hottub && (
                <Card.Grid style={gridStyle}>Hot Tub</Card.Grid>
              )}
              {listing && listing.current_listing_info_snapshot.has_air_conditioning && (
                <Card.Grid style={gridStyle}>Air Conditioning</Card.Grid>
              )}
              {listing && listing.current_listing_info_snapshot.has_heating && (
                <Card.Grid style={gridStyle}>Heating</Card.Grid>
              )}
              {listing && listing.current_listing_info_snapshot.has_kitchen && (
                <Card.Grid style={gridStyle}>Kitchen</Card.Grid>
              )}
              {listing && listing.current_listing_info_snapshot.has_tv && (
                <Card.Grid style={gridStyle}>TV</Card.Grid>
              )}
              {listing && listing.current_listing_info_snapshot.has_washer_dryer && (
                <Card.Grid style={gridStyle}>Washer / Dryer</Card.Grid>
              )}
              {listing && listing.current_listing_info_snapshot.has_wifi && (
                <Card.Grid style={gridStyle}>Wifi</Card.Grid>
              )}
            </Card>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    listing: state.Listings.listing,
    loadingListing: state.Listings.loadingListing,
    user: state.Auth.currentUser
  }),
  { getListing }
)(ListingDetail);

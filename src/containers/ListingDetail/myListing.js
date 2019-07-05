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
import CardWidgetWrapper from '../Dashboard/card/style';
import { Rate } from 'antd';
const { getListing } = listingsActions;

class MyListing extends Component {
  componentDidMount() {
    this.loadListing();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.listing && nextProps && nextProps.user && nextProps.user.current_user_property && this.props.listing.id !==   nextProps.user.current_user_property[0].currently_selected_listing_id){
      this.loadListing();
    }
  }

  loadListing = () => {
    const { getListing, user } = this.props;

    if(user && user.current_user_property && user.current_user_property[0] && user.current_user_property[0].currently_selected_listing_id) {
      getListing(user.current_user_property[0].currently_selected_listing_id);
    }
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
          <Col md={16} sm={24} xs={24} style={colStyle}>
            <Spin spinning={this.props.loadingListing} size="large">
              <ContentHolder>
                <CardWidgetWrapper className="isoCardWidget">
                  <Row style={rowStyle}>
                    <Col md={10} sm={24} xs={24}>
                        <div className="isoContentWrapper">
                          <img
                            alt="Listing"
                            width="240"
                            src={listing && listing.picture_1_url ? listing.picture_1_url : ''}
                          />
                        </div>
                    </Col>
                    <Col md={8} sm={24} xs={24}>
                        <a href={listing ? listing.url : ""} target="_blank">
                          <strong>
                            {listing ? listing.current_listing_info_snapshot.listing_title : ""}
                            <i className="ion-android-open" style={{marginLeft: '10px'}}/>
                          </strong>
                        </a>
                        <div>{listing ? listing.market.name : ""} - <span><i>{listing ? listing.rental_type.rental_type : ""}</i></span></div>
                        <div className="isoListingContentWrapper">
                          <div className="isoListingWrapper">
                            <span className="isoLabel">Sleeps: {listing ? listing.current_listing_info_snapshot.sleeps : ''}</span>
                          </div>
                          <div className="isoListingWrapper">
                            <span className="isoLabel">Beds: {listing ? listing.current_listing_info_snapshot.bedrooms : ''}</span>
                          </div>
                          <div className="isoContentWrapper">
                            <span className="isoLabel">Baths: {listing ? listing.current_listing_info_snapshot.bathrooms : ''}</span>
                          </div>
                        </div>
                        <div className="isoListingContentWrapper">
                          <div className="isoListingWrapper">
                            <div className="isoLabel">{listing ? listing.current_listing_reviews_snapshot.number_of_reviews : '0'} Reviews</div>
                            <div className="isoLabel">
                              <Rate style={{height: '20px', lineHeight: '20px'}} allowHalf disabled value={listing ? parseFloat(listing.current_listing_reviews_snapshot.overall_star_rating) : '0'} /> {listing ? parseFloat(listing.current_listing_reviews_snapshot.overall_star_rating) : '0'} Avg
                            </div>
                          </div>
                        </div>
                    </Col>
                    <Col md={6} sm={24} xs={24}>
                      <div className="isoContentWrapper">
                        <h3 className="isoStatNumber">${listing ? listing.current_listing_info_snapshot.base_price : ''}</h3>
                        <span className="isoLabel">Base Price</span>
                      </div>
                      <div className="isoContentWrapper spacer">
                        <h3 className="isoStatNumber">${listing ? listing.current_listing_info_snapshot.cleaning_fee : ''}</h3>
                        <span className="isoLabel">Cleaning Fee</span>
                      </div>
                    </Col>
                  </Row>
                </CardWidgetWrapper>
              </ContentHolder>
            </Spin>
          </Col>
          <Col md={8} sm={24} xs={24} style={colStyle}>
            <Spin spinning={this.props.loadingListing} size="large">
              <ContentHolder>
                <Card bodyStyle={{ padding: 0 }} title="Approximate Location">
                  <ListingMap user={user} listing={listing} />
                </Card>
              </ContentHolder>
            </Spin>
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
)(MyListing);

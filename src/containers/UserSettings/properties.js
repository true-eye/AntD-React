import React from 'react';
import { Row, Col, List, Avatar } from 'antd';
import basicStyle from '../../settings/basicStyle';
import Button from "../../components/uielements/button";
import listingsActions from '../../redux/listings/actions';
import settingsActions from '../../redux/settings/actions';
import propertiesActions from '../../redux/properties/actions';
import { connect } from 'react-redux';
import ContentHolder from "../../components/utility/contentHolder";
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import Spin from '../Feedback/Spin/spin.style';
import Modal from '../../components/feedback/modal';
import Alert from "../../components/feedback/alert";
import ImageCellView from '../../components/tables/imageCell';
import message from "../../components/feedback/message";
import MessageContent from "../Feedback/Message/message.style";
import {
  Fieldset,
  Form,
  Label,
  PlaceInput,
  ListItemStyle,
} from './properties.style';
import clone from 'clone';

const { getUserListings } = listingsActions;
const { toggleModal, toggleListingModal, toggleEditModal, findListing, propertyFormUpdate, addProperty, setDefaultListing } = settingsActions;
const { getPropertyCompetition } = propertiesActions;
const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

class Properties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      email: ""
    };
  }

  componentDidMount() {
    this.loadUserListings();
  }

  loadUserListings = () => {
    const { getUserListings } = this.props;
    getUserListings();
  };

  onDefaultListingSelect = (property_id, market) => {
    const { getPropertyCompetition } = this.props;

    this.setState({
      limit: 10
    });
    getPropertyCompetition(property_id,
      {
        limit: 10,
        criteria: {
          "ls.market_id": market
        }
      }
    );
  };

  togglePropertyModal = () => {
    const { toggleModal } = this.props;
    console.log("toggling modal");
    toggleModal();
  };

  toggleListingModal = () => {
    const { toggleListingModal } = this.props;
    toggleListingModal();
  };

  togglePropertyEditModal = (property) => {
    const { toggleEditModal } = this.props;
    toggleEditModal(property);
  };

  onRecordChange = (key, event) => {
    let { propertyForm } = clone(this.props);
    console.log("changin propertyForm", propertyForm);
    console.log(event);
    if (key) {
      propertyForm[key] = event;
    }
    this.props.propertyFormUpdate(propertyForm);
  };

  onButtonClick = (foundListings, propertyForm) => {
    const { findListing } = this.props;
    console.log(foundListings);

    if(foundListings) {
      this.togglePropertyModal();
    } else {
      geocodeByAddress(propertyForm.url)
        .then(results => {
          findListing(results);
        }).catch(error => {
          message.error(
            <MessageContent>
              <span>Please enter a valid property address.</span>
            </MessageContent>,
            5
          );
        });
    }
  };

  onListingSelect = (listingId, propertyId) => {
    const { setDefaultListing, user } = this.props;
    setDefaultListing(listingId, propertyId, user);
  };

  onLoadMore = (property_id, market) => {
    const { getPropertyCompetition } = this.props;
    const newLimit = this.state.limit + 10;
    this.setState({
      limit: this.state.limit + 10
    });

    getPropertyCompetition(property_id,
      {
        limit: newLimit,
        criteria: {
          "ls.market_id": market
        }
      }
    );
  }

  handleContact = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "address-contact", email: this.state.email, address: this.props.propertyForm.url })
    })
      .then(() => {
        message.success(
          <MessageContent>
            <span>We will let you know when your property address and location becomes available. Thank you.</span>
          </MessageContent>,
          10
        );
        this.setState({ email: "" });
      })
      .catch(error => console.log(error));

    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      user,
      listings,
      propListings,
      selectedPropertyId,
      modalActive,
      modalListingActive,
      foundListings,
      newProp,
      foundListingSuccess,
      notSupported
    } = this.props;
    const { propertyForm } = clone(this.props);
    const { rowStyle, colStyle, gutter } = basicStyle;
    const marginBot = {
      marginBottom: "10px"
    };
    const inputProps = {
      value: propertyForm.url,
      onChange: this.onRecordChange.bind(this, 'url'),
      placeholder: "Enter an address or location",
    };
    console.log("propListings", propListings);

    return (
      <div className="isoNoteTextbox">
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <h3 className="isoWidgetLabel">
            Monitored Properties
          </h3>
          <Button type="primary" className="vpBackgroundColor" icon="plus-circle" onClick={this.togglePropertyModal.bind(this)}>
            Add Property
          </Button>
        </div>

        <Modal
          visible={modalListingActive}
          onClose={this.toggleListingModal.bind(this)}
          title={propListings && propListings.length > 0 ? `Set Default ${propListings[0].market.name} Listing` : 'Set Default Listing'}
          onCancel={this.toggleListingModal.bind(this)}
          footer={[
            null,
            null,
          ]}
        >
          <Spin spinning={this.props.loadingDefaultListing} size="large">
            {propListings && (
              <List
                loadMore={
                  <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                    <Button onClick={this.onLoadMore.bind(this, selectedPropertyId, (propListings && propListings.length > 0 ? propListings[0].market.id : 1))}>Load More</Button>
                  </div>
                }
                dataSource={propListings}
                renderItem={item => (
                  <ListItemStyle>
                    <List.Item onClick={this.onListingSelect.bind(this, item.id, selectedPropertyId)} className="ant-table-row">
                      <List.Item.Meta
                        avatar={<Avatar size="large" shape="square" src={item.picture_1_url} />}
                        title={item.current_listing_info_snapshot.listing_title}
                      />
                    </List.Item>
                  </ListItemStyle>
                )}
              />
            )}
          </Spin>
        </Modal>

        <Modal
          visible={modalActive}
          onClose={this.togglePropertyModal.bind(this)}
          title={newProp? 'Select Default Listings' : 'Add Property'}
          okText={foundListingSuccess? 'Finish' : 'Add Property'}
          onOk={this.onButtonClick.bind(this, foundListings, propertyForm)}
          onCancel={this.togglePropertyModal.bind(this)}
        >
          {user && user.settings && user.settings.allowed_properties > user.properties.length && (
            <Spin spinning={this.props.loadingPropModal} size="large">
              {!newProp && (
                <Alert
                  message="How to add a property"
                  description={"Enter your property address or a location of a property you'd like to monitor."}
                  type="info"
                  showIcon
                  style={{}}
                />
              )}

              <br/><br/>
              <Form>
                {!newProp && (
                  <Fieldset>
                    <Label>Property Address</Label>
                    <PlaceInput>
                      <PlacesAutocomplete inputProps={inputProps}  />
                    </PlaceInput>
                  </Fieldset>
                )}
                {foundListingSuccess === false && (
                  <Alert
                    message="No property was found at that address, please try again."
                    type="warning"
                    style={marginBot}
                  />
                )}
                {notSupported === true && (
                  <div>
                    <Alert
                      message="The property address you've entered isn't currently supported by our system. Try a different address or enter your email to be notified when we add support for this area."
                      type="warning"
                      style={marginBot}
                    />
                    <Fieldset>
                      <Label>Your Email</Label>
                      <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </Fieldset>
                    <Button type="primary" className="vpBackgroundColor" onClick={this.handleContact}>
                      Notify Me!
                    </Button>


                  </div>
                )}
              </Form>
            </Spin>
          )}
          {user && user.settings && user.settings.allowed_properties <= user.properties.length && (
            <Alert
              message="Account Info"
              description={"The plan you've selected only allows you to have " + user.settings.allowed_properties + " " + (user.settings.allowed_properties === 1 ? 'property' : 'properties') + ". Go to the plan settings to adjust your plan if you'd like to monitor more properties."}
              type="warning"
              showIcon
              style={{}}
            />
          )}
        </Modal>

        <Spin spinning={this.props.loadingListing} size="large">
          <Row style={rowStyle} gutter={gutter} justify="start">
            <Col md={24} sm={24} xs={24} style={colStyle}>
              { listings && listings.length > 0 && (
                <div>
                  <ContentHolder>
                    <div className="ant-table ant-table-default ant-table-without-column-header ant-table-scroll-position-left">
                      <div className="ant-table-content">
                        <div className="ant-table-body">
                          <table className="">
                            <colgroup><col/><col/><col/></colgroup>
                            <thead className="ant-table-thead">
                              <tr>
                                <th className="ant-table-column-has-filters">
                                  <span>
                                    Property
                                  </span>
                                </th>
                                <th className="ant-table-column-has-filters">
                                  <span>
                                    AirBnb
                                  </span>
                                </th>
                                <th className="ant-table-column-has-filters">
                                  <span>
                                    VRBO
                                  </span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="ant-table-tbody">
                              {listings.map((e) => {
                                return (
                                  <tr className="ant-table-row  ant-table-row-level-0" key={e.id}>
                                    <td className="">
                                      <span className="table-operation">
                                        {e.property.street_address}
                                      </span>
                                    </td>
                                    <td className="">
                                      <span className="table-operation">
                                        <a onClick={() => {this.onDefaultListingSelect(e.property.id, 1)}}>
                                          { e.airbnb_listing && e.airbnb_listing.picture_1_url && (
                                            <ImageCellView src={e.airbnb_listing.picture_1_url} />
                                          )}
                                          { e.airbnb_listing && !e.airbnb_listing.picture_1_url && (
                                            e.airbnb_listing.current_listing_info_snapshot.listing_title
                                          )}
                                          { !e.airbnb_listing && (
                                            "Set Default"
                                          )}
                                        </a>
                                      </span>
                                    </td>
                                    <td className="">
                                      <span className="table-operation">
                                        <a onClick={() => {this.onDefaultListingSelect(e.property.id, 2)}}>
                                          { e.vrbo_listing && (
                                            <ImageCellView src={e.vrbo_listing.picture_1_url} />
                                          )}
                                          { !e.vrbo_listing && (
                                            "Set Default"
                                          )}
                                        </a>
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </ContentHolder>
                </div>
              )}
              { listings && listings.length <= 0 && (
                <ContentHolder>
                  <Alert
                    message="Add a property to monitor"
                    description={"You don't have any properties added on your account. Add a new one by clicking the 'Add Property' button in the upper right hand corner."}
                    type="info"
                    showIcon
                    style={{}}
                  />
                </ContentHolder>
              )}
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.Auth.currentUser,
    listings: state.Listings.listings,
    loadingListing: state.Listings.loadingListing,
    propertyForm: state.Settings.propertyForm,
    loadingProperties: state.Settings.loadingProperties,
    loadingPropModal: state.Settings.loadingPropModal,
    foundListings: state.Settings.foundListings,
    newProp: state.Settings.newProp,
    foundListingSuccess: state.Settings.foundListingSuccess,
    notSupported: state.Settings.notSupported,
    modalActive: state.Settings.modalActive,
    modalListingActive: state.Settings.modalListingActive,
    loadingDefaultListing: state.Properties.loadingDefaultListing,
    propListings: state.Properties.propListings,
    selectedPropertyId: state.Properties.selectedPropertyId
  };
}
export default connect(
  mapStateToProps,
  {
    getUserListings,
    toggleModal,
    toggleListingModal,
    toggleEditModal,
    findListing,
    propertyFormUpdate,
    addProperty,
    getPropertyCompetition,
    setDefaultListing
  }
)(Properties);

import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import settingsActions from '../../redux/settings/actions';
import SettingsList from './settingsList';
import SettingsComponentWrapper from './settingsComponent.style';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import PageHeader from "../../components/utility/pageHeader";
import { Row, Col } from 'antd';
import basicStyle from '../../settings/basicStyle';
import qs from 'query-string';
import {StripeProvider} from 'react-stripe-elements';
import {Elements} from 'react-stripe-elements';
import InjectedCheckoutForm from './checkoutForm';
import Plans from './plans';
import Profile from './profile';
import Properties from './properties';
import Spin from '../Feedback/Spin/spin.style';
import message from "../../components/feedback/message";
import MessageContent from "../Feedback/Message/message.style";
import Alert from "../../components/feedback/alert";

const { changeSetting, addBilling, getBilling } = settingsActions;
const { Content } = Layout;

class UserSettings extends Component {
  constructor(props) {
    super(props);

    var setting = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).s
    var notify = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).n

    if(setting) {
      props.changeSetting(setting, notify);
    }
  }

  componentDidMount() {
    this.loadBilling();
  }

  componentWillReceiveProps(nextProps) {
    const { billingError } = nextProps;
    console.log(billingError);
    if(billingError){
      message.error(
        <MessageContent>
          <span>{billingError.msg}</span>
        </MessageContent>,
        10
      );
    }
  }

  loadBilling = () => {
    const { getBilling } = this.props;
    getBilling();
  };

  render() {
    const {
      user,
      selectedSetting,
      changeSetting,
      addBilling,
      billing
    } = this.props;
    const { rowStyle, colStyle, gutter } = basicStyle;

    return (
      <LayoutWrapper>
        <PageHeader>User Settings</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <SettingsComponentWrapper className="isomorphicNoteComponent">
              <div style={{ width: '340px' }} className="isoNoteListSidebar">
                {user && (
                  <SettingsList
                    selectedSetting={selectedSetting}
                    changeSetting={changeSetting}
                  />
                )}
              </div>
              <Layout className="isoNotepadWrapper">
                <Content className="isoNoteEditingArea">
                  {selectedSetting === "profile" && (
                    <Profile />
                  )}
                  {selectedSetting === "plan" && (
                    <Plans />
                  )}
                  {selectedSetting === "billing" && (
                    <div className="isoNoteTextbox">
                      <Spin spinning={this.props.loadingBilling} size="large">
                        {billing && !billing.card && (
                          <StripeProvider apiKey={billing.api_key}>
                            <Elements>
                              <InjectedCheckoutForm user={user} saveCard={addBilling} loadingBilling={() => this.setState({loadingBilling: !this.state.loadingBilling})}/>
                            </Elements>
                          </StripeProvider>
                        )}
                        {billing && billing.card && (
                          <div>
                            <Alert
                              message="Card Info"
                              description={"Current card on file is a " + billing.card.brand + " ending in " + billing.card.last4 + ". If you would like to update your credit card, enter the information below."}
                              type="info"
                              showIcon
                              style={{}}
                            />
                            <br/><br/>
                            <StripeProvider apiKey={billing.api_key}>
                              <Elements>
                                <InjectedCheckoutForm user={user} saveCard={addBilling} loadingBilling={() => this.setState({loadingBilling: !this.state.loadingBilling})}/>
                              </Elements>
                            </StripeProvider>
                          </div>
                        )}
                      </Spin>
                    </div>
                  )}
                  {selectedSetting === "property" && (
                    <Properties />
                  )}
                </Content>
              </Layout>
            </SettingsComponentWrapper>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { selectedSetting } = state.Settings;

  return {
    selectedSetting,
    user: state.Auth.currentUser,
    loadingBilling: state.Settings.loadingBilling,
    billingError: state.Settings.billingError,
    billing: state.Settings.billing,
    notificationMsg: state.Settings.notificationMsg
  };
}
export default connect(
  mapStateToProps,
  {
    changeSetting,
    addBilling,
    getBilling,
  }
)(UserSettings);

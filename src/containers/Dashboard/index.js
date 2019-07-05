import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import basicStyle from '../../settings/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
import IsoWidgetBox from './widget-box';
import CardWidget from './card/card-widgets';
import ReportsWidget from './report/report-widget';
import { TableViews } from '../Tables/antTables';
import { tableinfos } from './config/tableconfigs';
import BookingAreaChart from '../Charts/recharts/charts/bookingAreaChart';
import ProjectedRentBarChart from '../Charts/recharts/charts/projectedRentBarChart';
import IntlMessages from '../../components/utility/intlMessages';
import PricingLineChart from "../Charts/recharts/charts/pricingLineChart";
import propertiesActions from "../../redux/properties/actions";
import PropertyMap from "../Map/GoogleMap/maps/propertyMap";
import { Card } from 'antd';
import Spin from '../Feedback/Spin/spin.style';

const { getCompetition, getMarketBooking, getMarketPricing, getProjectedRent, getMarketStats } = propertiesActions;

class Dashboard extends Component {
  componentDidMount() {
    this.loadCompetition();
    this.loadBooking();
    this.loadPricing();
    this.loadProjectedRent();
    this.loadMarketStats();
  }

  componentWillReceiveProps(nextProps) {
    // if(this.props.user !== nextProps.user) {
      // if(nextProps.user && !nextProps.user.settings.selected_plan){
      //   this.props.history.push("/dashboard/settings?s=plan&n=true");
      //   console.log("no plan");
      // } else if (nextProps.user && nextProps.user.settings.monthly_amount > 0 && !nextProps.user.settings.stripe_subscription_id) {
      //   this.props.history.push("/dashboard/settings?s=billing&n=true");
      //   console.log("no card");
      // } else if (nextProps.user && !nextProps.user.property_id) {
      //   this.props.history.push("/dashboard/settings?s=property&n=true");
      //   console.log("no property");
      // }
    // }

    if(this.props.user && nextProps.user && this.props.user.current_property !== nextProps.user.current_property){
      this.loadCompetition();
      this.loadBooking();
      this.loadPricing();
      this.loadProjectedRent();
      this.loadMarketStats();
    }
  }

  loadCompetition = () => {
    const { getCompetition } = this.props;
    getCompetition({limit: 5});
  };
  loadBooking = () => {
    const { getMarketBooking } = this.props;
    getMarketBooking();
  };
  loadPricing = () => {
    const { getMarketPricing } = this.props;
    getMarketPricing();
  };
  loadProjectedRent = () => {
    const { getProjectedRent } = this.props;
    getProjectedRent();
  };
  loadMarketStats = () => {
    const { getMarketStats } = this.props;
    getMarketStats();
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const wisgetPageStyle = {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'flex-start',
      overflow: 'hidden',
    };

    const {
      competition,
      bookings,
      pricing,
      projectedRent,
      marketStats
    } = this.props;

    const bookingConfig = {
      colors: ['#BAA6CA', '#B7DCFA', '#FFE69A', '#788195'],
      width: window.innerWidth < 450 ? 300 : window.innerWidth,
      height: 350,
      datas: bookings
    };
    const rentConfig = {
      colors: ['#BAA6CA', '#B7DCFA', '#FFE69A', '#788195'],
      width: window.innerWidth < 450 ? 300 : 500,
      height: 350,
      datas: projectedRent
    };
    const pricingConfig = {
      width: window.innerWidth < 450 ? 300 : 500,
      height: 350,
      datas: pricing
    };
    return (
      <LayoutWrapper>
        <div style={wisgetPageStyle}>
          <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Report Widget */}
                <ReportsWidget
                  label={<IntlMessages id="dashboard.reportsrate.label" />}
                >
                  <Spin spinning={this.props.loadingPricingChart} size="large"><PricingLineChart {...pricingConfig} /></Spin>
                </ReportsWidget>
              </IsoWidgetsWrapper>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
              <Spin spinning={this.props.user == null} size="large">
                <IsoWidgetsWrapper height='100%'>
                  <Card bodyStyle={{ padding: 0 }} title="Property Location">
                    {this.props.user && (
                      <PropertyMap user={this.props.user} property={this.props.user.current_property} />
                    )}
                  </Card>
                </IsoWidgetsWrapper>
              </Spin>
            </Col>
          </Row>

          <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
              <IsoWidgetsWrapper height='100%'>
                <ReportsWidget
                  label="Top 5 Nearest Properties"
                >
                  <Spin spinning={this.props.loadingCompetition} size="large">
                    <TableViews.DashboardView
                      tableInfo={tableinfos[0]}
                      dataSource={competition}
                    />
                  </Spin>
                </ReportsWidget>
              </IsoWidgetsWrapper>
            </Col>
            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <Spin spinning={this.props.loadingMarketStats} size="large">
                <IsoWidgetsWrapper gutterBottom={20}>
                  <CardWidget
                    icon="ion-ios-bookmarks"
                    iconcolor="#F75D81"
                    number={marketStats && marketStats.booking_percent[0].pct_booked ? (parseFloat(marketStats.booking_percent[0].pct_booked) * 100).toLocaleString(undefined, {maximumFractionDigits:0}) + '%' : '0%'}
                    text="30 Day Booking %"
                  />
                </IsoWidgetsWrapper>
              </Spin>
              <Spin spinning={this.props.loadingMarketStats} size="large">
                <IsoWidgetsWrapper gutterBottom={20}>
                  <CardWidget
                    icon="ion-ios-bookmarks"
                    iconcolor="#F75D81"
                    number={marketStats && marketStats.booking_percent_competition[0].pct_booked ? (parseFloat(marketStats.booking_percent_competition[0].pct_booked) * 100).toLocaleString(undefined, {maximumFractionDigits:0}) + '%' : '0%'}
                    text="Market 30 Day Booking %"
                  />
                </IsoWidgetsWrapper>
              </Spin>
            </Col>

            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <Spin spinning={this.props.loadingMarketStats} size="large">
                <IsoWidgetsWrapper gutterBottom={20}>
                  <CardWidget
                    number={marketStats && marketStats.annual_revenue[0].revenue ? "$" + parseFloat(marketStats.annual_revenue[0].revenue).toLocaleString(undefined, {maximumFractionDigits:0}) : '0'}
                    text="Your Annual Revenue"
                    icon="ion-pricetag"
                    iconcolor="#4482FF"
                  />
                </IsoWidgetsWrapper>
              </Spin>
              <Spin spinning={this.props.loadingMarketStats} size="large">
                <IsoWidgetsWrapper gutterBottom={20}>
                  <CardWidget
                    number={marketStats && marketStats.annual_revenue_competition[0].avg_revenue ? "$" + parseFloat(marketStats.annual_revenue_competition[0].avg_revenue).toLocaleString(undefined, {maximumFractionDigits:2}) : '0'}
                    text="Market Annual Avg."
                    icon="ion-pricetag"
                    iconcolor="#4482FF"
                  />
                </IsoWidgetsWrapper>
              </Spin>
            </Col>
          </Row>

          <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={12} md={24} sm={24} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                <ReportsWidget
                  label="Monthly Projected Rent Comparison"
                >
                  <IsoWidgetBox height={470} style={{ overflow: 'hidden' }}>
                    <Spin spinning={this.props.loadingProejectedRentChart} size="large"><ProjectedRentBarChart {...rentConfig}/></Spin>
                  </IsoWidgetBox>
                </ReportsWidget>
              </IsoWidgetsWrapper>
            </Col>
            <Col lg={12} md={24} sm={24} xs={24} style={colStyle}>
              <IsoWidgetsWrapper height='100%'>
                <ReportsWidget
                  label="Market Booking Trend"
                >
                  <IsoWidgetBox height={455} style={{ overflow: 'hidden' }}>
                      <Spin spinning={this.props.loadingBookingChart} size="large"><BookingAreaChart {...bookingConfig}/></Spin>
                  </IsoWidgetBox>
                </ReportsWidget>
              </IsoWidgetsWrapper>
            </Col>
          </Row>

        </div>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    competition: state.Properties.competition,
    bookings: state.Properties.bookings,
    pricing: state.Properties.pricing,
    projectedRent: state.Properties.projectedRent,
    loadingPricingChart: state.Properties.loadingPricingChart,
    loadingCompetition: state.Properties.loadingCompetition,
    loadingBookingChart: state.Properties.loadingBookingChart,
    loadingProejectedRentChart: state.Properties.loadingProejectedRentChart,
    loadingMarketStats: state.Properties.loadingMarketStats,
    marketStats: state.Properties.marketStats,
    user: state.Auth.currentUser
  }),
  { getCompetition, getMarketBooking, getMarketPricing, getProjectedRent, getMarketStats }
)(Dashboard);

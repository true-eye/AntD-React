import React, { Component } from "react";
import { connect } from "react-redux";
import propertiesActions from "../../redux/properties/actions";
import { CalendarStyleWrapper } from "./calendar.style";
import DnDCalendar from "./DnDCalendar";
import PageHeader from "../../components/utility/pageHeader";
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import { Row, Col } from 'antd';
import basicStyle from '../../settings/basicStyle';
import moment from 'moment';
import ContentHolder from "../../components/utility/contentHolder";
import Box from "../../components/utility/box";
import Spin from '../Feedback/Spin/spin.style';
import Alert from "../../components/feedback/alert";
import { Link } from "react-router-dom";
import Tooltip from '../../components/uielements/tooltip';

const { getCalendarPricing, getCalendarPricingByMonth, getCalendarPricingByDay } = propertiesActions;

const EventComponent = (event) => { return (
  <div>
  {event.event.userProperty && (
    <div className="text-center w-100 booking-avg" style={{'backgroundColor': 'transparent', 'color': 'black'}}>
      {!event.event.upgrade_plan && (
        <Tooltip title="Your Listing's Rate"><p className="pricing-text property-pricing">${parseFloat(event.title).toFixed(0)}</p></Tooltip>
      )}
      {event.event.upgrade_plan && (
        <Tooltip title="Upgrade your plan to unlock this data"><Link className="upgrade-text" to="/dashboard/settings?s=plan">Upgrade plan</Link></Tooltip>
      )}
    </div>
  )}
  {!event.event.userProperty && (
    <div className="text-center w-100 booking-avg" style={{'backgroundColor': 'transparent', 'color': 'black'}}>
      {!event.event.upgrade_plan && (
        <Tooltip title="Your Competition's Average Rate"><p className="pricing-text competition-pricing">${parseFloat(event.title).toFixed(0)}</p></Tooltip>
      )}
    </div>
  )}
  </div>
) }

class PricingCalender extends Component {
  componentDidMount() {
    this.loadCalendarPricing();
    this.loadCalendarPricingMonthStats();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.user && nextProps.user && this.props.user.current_property !== nextProps.user.current_property){
      this.loadCalendarPricing();
      this.loadCalendarPricingMonthStats();
    }
  }

  loadCalendarPricing = () => {
    const { getCalendarPricing, monthDate, interval, filterStates } = this.props;
    getCalendarPricing(moment(monthDate).format('MM-DD-YYYY'), interval, filterStates);
  };

  loadCalendarPricingMonthStats = () => {
    const { getCalendarPricingByMonth, monthDate, interval, filterStates } = this.props;
    getCalendarPricingByMonth(moment(monthDate).format('MM-DD-YYYY'), interval, filterStates);
  };

  calendarChanged = (date) => {
    const { getCalendarPricing, getCalendarPricingByMonth, interval, filterStates } = this.props;
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    getCalendarPricing(moment(firstDay).format('MM-DD-YYYY'), interval, filterStates);
    getCalendarPricingByMonth(moment(firstDay).format('MM-DD-YYYY'), interval, filterStates);
  }

  calendarDaySelected = (date) => {
    const { getCalendarPricingByDay, filterStates } = this.props;

    getCalendarPricingByDay(moment(date.start).format('MM-DD-YYYY'), filterStates);
  }

  state = {
    view: this.props.view,
  };

  onSelectSlot = selectedData => {
  };
  onView = view => {
    this.props.changeView(view);
  };
  onEventDrop = newOption => {
  };

  render() {
    const {
      calendarPricings,
      calendarPricingsMonthStat,
      calendarPricingsDayStat
    } = this.props;

    var events = [];

    console.log(calendarPricings);

    if(calendarPricings) {
      var upgradeDate = new Date();

      if(this.props.user) {
        console.log(this.props.user);
        var weeks = this.props.user.settings.viewable_weeks;
        upgradeDate.setDate(upgradeDate.getDate() + (weeks * 7));
      }

      var index = 0;
      for(var b in calendarPricings) {
        var pricing = calendarPricings[b];
        var localeDate = new Date(pricing.booking_date);
        var utcDate = new Date(localeDate.getTime() + localeDate.getTimezoneOffset() * 60000);

        events.push({
          id: index,
          title: pricing.property_price,
          allDay: true,
          start: utcDate,
          end: utcDate,
          userProperty: true,
          upgrade_plan: utcDate > upgradeDate ? true : false
        });
        events.push({
          id: index,
          title: pricing.average_price,
          allDay: true,
          start: (utcDate).setSeconds(utcDate.getSeconds() + 10),
          end: utcDate,
          userProperty: false,
          upgrade_plan: utcDate > upgradeDate ? true : false
        });
        index++;
      }
    }

    const { rowStyle, colStyle, gutter } = basicStyle;
    const { selectedData } = this.state;
    const calendarOptions = {
      events,
      selectedData,
      components: {
        event: EventComponent
      },
      views: ['month'],
      onSelectEvent: this.calendarDaySelected,
      onSelectSlot: this.onSelectSlot,
      onEventDrop: this.onEventDrop,
      onNavigate: this.calendarChanged
    };
    return (
      <LayoutWrapper>
        <PageHeader>Market Pricing and Rates</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Alert
                  message="Calendar Info"
                  description="Each day will tell you if you your rate and the average market rate. Your rate is the top number (blue) and the average market rate is the bottom number (black)."
                  type="info"
                  showIcon
                  style={{}}
                />
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={18} sm={24} xs={24} style={colStyle}>
            <CalendarStyleWrapper className="isomorphicCalendarWrapper">
              <Spin spinning={this.props.loadingPricingCal} size="large"><DnDCalendar {...calendarOptions} /></Spin>
            </CalendarStyleWrapper>
          </Col>
          <Col md={6} sm={24} xs={24} style={colStyle}>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <Box style={{borderRadius: 10}}>
                  <Spin spinning={this.props.loadingPricingMonth} size="large">
                    <CalendarStyleWrapper className="">
                      <h2 className="isoWidgetLabel">Month Info</h2>
                      <ContentHolder>
                        <div className="isoContentWrapper">
                          <h3 className="isoStatNumber">${calendarPricingsMonthStat && calendarPricingsMonthStat[0].property_price ? parseFloat(calendarPricingsMonthStat[0].property_price).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) : 0}</h3>
                          <span className="isoLabel">Your Average Rate</span>
                        </div>
                      </ContentHolder>
                      <ContentHolder>
                        <div className="isoContentWrapper">
                          <h3 className="isoStatNumber">${calendarPricingsMonthStat && calendarPricingsMonthStat[0].average_price ? parseFloat(calendarPricingsMonthStat[0].average_price).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) : 0}</h3>
                          <span className="isoLabel">Competition Average Rate</span>
                        </div>
                      </ContentHolder>
                      <ContentHolder>
                        <div className="isoContentWrapper">
                          <h3 className="isoStatNumber">${calendarPricingsMonthStat && calendarPricingsMonthStat[0].max_price ? parseFloat(calendarPricingsMonthStat[0].max_price).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) : 0}</h3>
                          <span className="isoLabel">Competition Highest Rate</span>
                        </div>
                      </ContentHolder>
                      <ContentHolder>
                        <div className="isoContentWrapper">
                          <h3 className="isoStatNumber">${calendarPricingsMonthStat && calendarPricingsMonthStat[0].min_price ? parseFloat(calendarPricingsMonthStat[0].min_price).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) : 0}</h3>
                          <span className="isoLabel">Competition Lowest Rate</span>
                        </div>
                      </ContentHolder>
                    </CalendarStyleWrapper>
                  </Spin>
                </Box>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={25} sm={24} xs={24} style={colStyle}>
                <Box style={{borderRadius: 10}}>
                  <Spin spinning={this.props.loadingPricingDay} size="large">
                    <CalendarStyleWrapper className="">
                      <h2 className="isoWidgetLabel">Day Info</h2>
                      {!calendarPricingsDayStat && (
                        <p>Please select a day to see statistics and info for that day</p>
                      )}
                      {calendarPricingsDayStat && calendarPricingsDayStat[0] && (
                        <div>
                          <h3>{moment(calendarPricingsDayStat[0].booking_date).format('MM-DD-YYYY')}</h3>
                          <ContentHolder>
                            <div className="isoContentWrapper">
                              <h3 className="isoStatNumber">${calendarPricingsDayStat[0].property_price ? parseFloat(calendarPricingsDayStat[0].property_price).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) : 0}</h3>
                              <span className="isoLabel">Your Rate</span>
                            </div>
                          </ContentHolder>
                          <ContentHolder>
                            <div className="isoContentWrapper">
                              <h3 className="isoStatNumber">${calendarPricingsDayStat[0].average_price ? parseFloat(calendarPricingsDayStat[0].average_price).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) : 0}</h3>
                              <span className="isoLabel">Average Competition Rate</span>
                            </div>
                          </ContentHolder>
                          <ContentHolder>
                            <div className="isoContentWrapper">
                              <h3 className="isoStatNumber">${calendarPricingsDayStat[0].max_price ? parseFloat(calendarPricingsDayStat[0].max_price).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) : 0}</h3>
                              <span className="isoLabel">Highest Competition Rate</span>
                            </div>
                          </ContentHolder>
                          <ContentHolder>
                            <div className="isoContentWrapper">
                              <h3 className="isoStatNumber">${calendarPricingsDayStat[0].min_price ? parseFloat(calendarPricingsDayStat[0].min_price).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) : 0}</h3>
                              <span className="isoLabel">Lowest Competition Rate</span>
                            </div>
                          </ContentHolder>
                          <ContentHolder>
                            <div className="isoContentWrapper">
                              <h3 className="isoStatNumber">{calendarPricingsDayStat[0].prop_booked ? 'Yes' : 'No'}</h3>
                              <span className="isoLabel">You&apos;re Booked?</span>
                            </div>
                          </ContentHolder>
                          <ContentHolder>
                            <div className="isoContentWrapper">
                              <h3 className="isoStatNumber">{calendarPricingsDayStat[0].comp_book_count ? parseInt(calendarPricingsDayStat[0].comp_book_count, 10) : 0}</h3>
                              <span className="isoLabel">Number of Competition Properties Booked</span>
                            </div>
                          </ContentHolder>
                          <ContentHolder>
                            <div className="isoContentWrapper">
                              <h3 className="isoStatNumber">{calendarPricingsDayStat[0].comp_not_book_count ? parseInt(calendarPricingsDayStat[0].comp_not_book_count, 10) : 0}</h3>
                              <span className="isoLabel">Number of Competition Properties Not Booked</span>
                            </div>
                          </ContentHolder>
                          <ContentHolder>
                            <div className="isoContentWrapper">
                              <h3 className="isoStatNumber">{parseFloat((parseInt(calendarPricingsDayStat[0].comp_book_count, 10) / (parseInt(calendarPricingsDayStat[0].comp_not_book_count, 10) + parseInt(calendarPricingsDayStat[0].comp_book_count, 10))) * 100).toLocaleString(undefined, {maximumFractionDigits:0})}%</h3>
                              <span className="isoLabel">Competition Booked Percentage</span>
                            </div>
                          </ContentHolder>
                        </div>
                      )}
                    </CalendarStyleWrapper>
                  </Spin>
                </Box>
              </Col>
            </Row>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    calendarPricings: state.Properties.calendarPricings,
    calendarPricingsMonthStat: state.Properties.calendarPricingsMonthStat,
    calendarPricingsDayStat: state.Properties.calendarPricingsDayStat,
    loadingPricingMonth: state.Properties.loadingPricingMonth,
    loadingPricingDay: state.Properties.loadingPricingDay,
    loadingPricingCal: state.Properties.loadingPricingCal,
    user: state.Auth.currentUser,
    monthDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1),
    interval: 1,
    filterStates: {
      'criteria': {
        'bedrooms': 'all',
        'bathrooms': 'all',
        'sleeps': 'all'
      }
    }
  }),
  { getCalendarPricing, getCalendarPricingByMonth, getCalendarPricingByDay }
)(PricingCalender);

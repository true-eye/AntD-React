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
import Tooltip from '../../components/uielements/tooltip';
import { Link } from "react-router-dom";

const { getCalendarBooking, getCalendarBookingByMonth } = propertiesActions;

function heatMapColorforValue(value){
  var h = (1.0 - value) * 240
  return "hsl(" + h + ", 100%, 50%)";
}
function textColorforValue(value){
  if(value < 0.19) {
    return "#fff";
  } else {
    return "#000";
  }
}

const EventComponent = (event) => { return (
  <div>
  {event.event.userProperty && (
    <div className="w-100 booking-avg" style={{'backgroundColor': 'transparent', 'color': 'black'}}>
      {!event.event.upgrade_plan && (
        <p>{event.title}</p>
      )}
      {event.event.upgrade_plan && (
        <Tooltip title="Upgrade your plan to unlock this data"><Link className="upgrade-text" to="/dashboard/settings?s=plan">Upgrade plan</Link></Tooltip>
      )}
    </div>
  )}
  {!event.event.userProperty && !event.event.upgrade_plan && (
    <div className="text-center w-100 booking-avg" style={{'backgroundColor': heatMapColorforValue(event.title), 'color': textColorforValue(event.title)}}>
      <p>{(event.title * 100).toFixed(0)}%</p>
    </div>
  )}
  </div>
) }

class BookingCalender extends Component {
  componentDidMount() {
    this.loadCalendarBooking();
    this.loadCalendarBookingMonthStats();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.user && nextProps.user && this.props.user.current_property !== nextProps.user.current_property){
      this.loadCalendarBooking();
      this.loadCalendarBookingMonthStats();
    }
  }

  loadCalendarBooking = () => {
    const { getCalendarBooking, monthDate, interval, filterStates } = this.props;
    getCalendarBooking(moment(monthDate).format('MM-DD-YYYY'), interval, filterStates);
  };

  loadCalendarBookingMonthStats = () => {
    const { getCalendarBookingByMonth, monthDate, interval, filterStates } = this.props;
    getCalendarBookingByMonth(moment(monthDate).format('MM-DD-YYYY'), interval, filterStates);
  };

  calendarChanged = (date) => {
    const { getCalendarBooking, getCalendarBookingByMonth, interval, filterStates } = this.props;
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    getCalendarBooking(moment(firstDay).format('MM-DD-YYYY'), interval, filterStates);
    getCalendarBookingByMonth(moment(firstDay).format('MM-DD-YYYY'), interval, filterStates);
  }

  state = {
    view: this.props.view,
  };

  onSelectEvent = selectedData => {
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
      calendarBookings,
      calendarBookingsMonthStat,
    } = this.props;

    var events = [];

    if(calendarBookings) {
      var index = 0;
      var upgradeDate = new Date();

      if(this.props.user) {
        var weeks = this.props.user.settings.viewable_weeks;
        upgradeDate.setDate(upgradeDate.getDate() + (weeks * 7));
      }

      for(var b in calendarBookings) {
        var booking = calendarBookings[b];
        var localeDate = new Date(booking.booking_date);
        var utcDate = new Date(localeDate.getTime() + localeDate.getTimezoneOffset() * 60000);
        events.push({
          id: index,
          title: booking.prop_booked ? 'Booked' : 'Open',
          allDay: true,
          start: utcDate,
          end: utcDate,
          userProperty: true,
          upgrade_plan: utcDate > upgradeDate ? true : false
        });
        index++;
      }
      for(var c in calendarBookings) {
        var comp_booking = calendarBookings[c];
        var localeDate = new Date(comp_booking.booking_date);
        var utcDate = new Date(localeDate.getTime() + localeDate.getTimezoneOffset() * 60000);
        events.push({
          id: index,
          title: comp_booking.comp_book_count / (comp_booking.comp_book_count + comp_booking.comp_not_book_count),
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
      onSelectEvent: this.onSelectEvent,
      onSelectSlot: this.onSelectSlot,
      onEventDrop: this.onEventDrop,
      onNavigate: this.calendarChanged
    };
    return (
      <LayoutWrapper>
        <PageHeader>Market Booking</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Alert
                  message="Calendar Info"
                  description="Each day will tell you if you are booked or not. The percentage number tells you what the average market booking for other properties are for that day. The higher the percent, the more in demand the day is."
                  type="info"
                  showIcon
                  style={{}}
                />
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={18} sm={24} xs={24} style={colStyle}>
            <CalendarStyleWrapper className="isomorphicCalendarWrapper">
              <Spin spinning={this.props.loadingBookingCal} size="large"><DnDCalendar {...calendarOptions} /></Spin>
            </CalendarStyleWrapper>
          </Col>
          <Col md={6} sm={24} xs={24} style={colStyle}>
            <Box style={{borderRadius: 10}}>
              <Spin spinning={this.props.loadingStat} size="large">
                <CalendarStyleWrapper className="">
                  <h2 className="isoWidgetLabel">Month Info</h2>
                  <ContentHolder>
                    <div className="isoContentWrapper">
                      <h3 className="isoStatNumber">{calendarBookingsMonthStat && calendarBookingsMonthStat[0].prop_booked_count ? calendarBookingsMonthStat[0].prop_booked_count : 0}</h3>
                      <span className="isoLabel">Your Nights Booked</span>
                    </div>
                  </ContentHolder>
                  <ContentHolder>
                    <div className="isoContentWrapper">
                      <h3 className="isoStatNumber">{calendarBookingsMonthStat && calendarBookingsMonthStat[0].prop_booked_count ? ((parseInt(calendarBookingsMonthStat[0].prop_booked_count, 10) / (parseInt(calendarBookingsMonthStat[0].day_count, 10))) * 100).toLocaleString(undefined, {minimumFractionDigits:0, maximumFractionDigits:0}) : 0}%</h3>
                      <span className="isoLabel">Your Occupancy Rate</span>
                    </div>
                  </ContentHolder>
                  <ContentHolder>
                    <div className="isoContentWrapper">
                      <h3 className="isoStatNumber">{calendarBookingsMonthStat && calendarBookingsMonthStat[0].booked_count && calendarBookingsMonthStat[0].not_booked_count ? ((parseInt(calendarBookingsMonthStat[0].booked_count, 10) / (parseInt(calendarBookingsMonthStat[0].booked_count, 10) + parseInt(calendarBookingsMonthStat[0].not_booked_count, 10))) * 100).toLocaleString(undefined, {minimumFractionDigits:0, maximumFractionDigits:0}) : 0}%</h3>
                      <span className="isoLabel">Comp. Occupancy Rate</span>
                    </div>
                  </ContentHolder>
                </CalendarStyleWrapper>
              </Spin>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    calendarBookings: state.Properties.calendarBookings,
    calendarBookingsMonthStat: state.Properties.calendarBookingsMonthStat,
    loadingStat: state.Properties.loadingStat,
    loadingBookingCal: state.Properties.loadingBookingCal,
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
  { getCalendarBooking, getCalendarBookingByMonth }
)(BookingCalender);

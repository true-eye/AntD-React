import actions from './actions';

const initState = {
  competition: null,
  propListings: null,
  bookings: null,
  pricing: null,
  projectedRent: null,
  marketStats: null,
  loadingPricingDay: false,
  loadingMarketStats: false,
  calendarPricingsDayStat: null
};

export default function propertyReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_COMPETITION:
      return {
        ...state,
        loadingCompetition: true
      };
    case actions.GET_PROPERTY_COMPETITION:
      return {
        ...state,
        loadingDefaultListing: true
      };
    case actions.SET_PROPERTY_COMPETITION:
      return {
        ...state,
        propListings: action.competition,
        selectedPropertyId: action.selectedPropertyId,
        loadingDefaultListing: false
      };
    case actions.SET_COMPETITION:
      return {
        ...state,
        competition: action.competition,
        loadingCompetition: false
      };
    case actions.GET_MARKET_BOOKING:
      // console.log(action);
      return {
        ...state,
        loadingBookingChart: true
      };
    case actions.SET_MARKET_BOOKING:
      // console.log(action);
      return {
        ...state,
        bookings: action.bookings,
        loadingBookingChart: false
      };
    case actions.GET_CAL_BOOKING:
      // console.log(action);
      return {
        ...state,
        loadingBookingCal: true
      };
    case actions.SET_CAL_BOOKING:
      // console.log(action);
      return {
        ...state,
        calendarBookings: action.calendarBookings,
        loadingBookingCal: false
      };
    case actions.GET_CAL_PRICING:
      // console.log(action);
      return {
        ...state,
        loadingPricingCal: true
      };
    case actions.SET_CAL_PRICING:
      // console.log(action);
      return {
        ...state,
        calendarPricings: action.calendarPricings,
        loadingPricingCal: false
      };
    case actions.GET_CAL_BOOKING_MONTH:
      return {
        ...state,
        loadingStat: true
      };
    case actions.SET_CAL_BOOKING_MONTH:
      // console.log(action);
      return {
        ...state,
        calendarBookingsMonthStat: action.calendarBookingsMonthStat,
        loadingStat: false
      };
    case actions.GET_CAL_PRICING_MONTH:
      return {
        ...state,
        loadingPricingMonth: true
      };
    case actions.SET_CAL_PRICING_MONTH:
      // console.log(action);
      return {
        ...state,
        calendarPricingsMonthStat: action.calendarPricingsMonthStat,
        loadingPricingMonth: false
      };
    case actions.GET_CAL_PRICING_DAY:
      return {
        ...state,
        loadingPricingDay: true
      };
    case actions.SET_CAL_PRICING_DAY:
      // console.log(action);
      return {
        ...state,
        calendarPricingsDayStat: action.calendarPricingsDayStat,
        loadingPricingDay: false
      };
    case actions.GET_MARKET_PRICING:
      // console.log(action);
      return {
        ...state,
        loadingPricingChart: true
      };
    case actions.SET_MARKET_PRICING:
      // console.log(action);
      return {
        ...state,
        pricing: action.pricing,
        loadingPricingChart: false
      };
    case actions.GET_MARKET_STATS:
      return {
        ...state,
        loadingMarketStats: true
      };
    case actions.SET_MARKET_STATS:
      return {
        ...state,
        marketStats: action.stats,
        loadingMarketStats: false
      };
    case actions.GET_PROJECTED_RENT:
      // console.log(action);
      return {
        ...state,
        loadingProejectedRentChart: true
      };
    case actions.SET_PROJECTED_RENT:
      // console.log(action);
      return {
        ...state,
        projectedRent: action.projectedRent,
        loadingProejectedRentChart: false
      };
    default:
      return state;
  }
}

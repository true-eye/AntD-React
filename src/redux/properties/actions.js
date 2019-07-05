const propertiesAction = {
  GET_COMPETITION: 'GET_COMPETITION',
  SET_COMPETITION: 'SET_COMPETITION',
  GET_PROPERTY_COMPETITION: 'GET_PROPERTY_COMPETITION',
  SET_PROPERTY_COMPETITION: 'SET_PROPERTY_COMPETITION',
  GET_CAL_BOOKING: 'GET_CAL_BOOKING',
  SET_CAL_BOOKING: 'SET_CAL_BOOKING',
  GET_CAL_BOOKING_MONTH: 'GET_CAL_BOOKING_MONTH',
  SET_CAL_BOOKING_MONTH: 'SET_CAL_BOOKING_MONTH',
  GET_MARKET_BOOKING: 'GET_MARKET_BOOKING',
  SET_MARKET_BOOKING: 'SET_MARKET_BOOKING',
  GET_MARKET_PRICING: 'GET_MARKET_PRICING',
  SET_MARKET_PRICING: 'SET_MARKET_PRICING',
  GET_CAL_PRICING: 'GET_CAL_PRICING',
  SET_CAL_PRICING: 'SET_CAL_PRICING',
  GET_CAL_PRICING_MONTH: 'GET_CAL_PRICING_MONTH',
  SET_CAL_PRICING_MONTH: 'SET_CAL_PRICING_MONTH',
  GET_CAL_PRICING_DAY: 'GET_CAL_PRICING_DAY',
  SET_CAL_PRICING_DAY: 'SET_CAL_PRICING_DAY',
  GET_PROJECTED_RENT: 'GET_PROJECTED_RENT',
  SET_PROJECTED_RENT: 'SET_PROJECTED_RENT',
  GET_MARKET_STATS: 'GET_MARKET_STATS',
  SET_MARKET_STATS: 'SET_MARKET_STATS',
  GOTO_LISTING_PAGE: 'GOTO_LISTING_PAGE',
  getCompetition: (filter) => {
    console.log("Loading competition");
    return {
      type: propertiesAction.GET_COMPETITION,
      filter: filter
    };
  },
  getPropertyCompetition: (property_id, filter) => {
    return {
      type: propertiesAction.GET_PROPERTY_COMPETITION,
      filter: filter,
      id: property_id
    };
  },
  gotoListingPage: (listingId) => {
    console.log("navigating to listing page");
    return {
      type: propertiesAction.GOTO_LISTING_PAGE,
      listingId: listingId
    };
  },
  getMarketBooking: () => {
    console.log("Loading market booking");
    return {
      type: propertiesAction.GET_MARKET_BOOKING
    };
  },
  getCalendarPricing: (calDate, interval, filterStates) => {
    console.log("Loading calendar pricing");
    return {
      type: propertiesAction.GET_CAL_PRICING,
      calDate: calDate,
      interval: interval,
      filterStates: filterStates
    };
  },
  getCalendarPricingByMonth: (calDate, interval, filterStates) => {
    console.log("Loading calendar booking by month");
    return {
      type: propertiesAction.GET_CAL_PRICING_MONTH,
      calDate: calDate,
      interval: interval,
      filterStates: filterStates
    };
  },
  getCalendarPricingByDay: (calDate, filterStates) => {
    console.log("Loading calendar booking by day");
    return {
      type: propertiesAction.GET_CAL_PRICING_DAY,
      calDate: calDate,
      filterStates: filterStates
    };
  },
  getCalendarBooking: (calDate, interval, filterStates) => {
    console.log("Loading calendar booking");
    return {
      type: propertiesAction.GET_CAL_BOOKING,
      calDate: calDate,
      interval: interval,
      filterStates: filterStates
    };
  },
  getCalendarBookingByMonth: (calDate, interval, filterStates) => {
    console.log("Loading calendar booking by month");
    return {
      type: propertiesAction.GET_CAL_BOOKING_MONTH,
      calDate: calDate,
      interval: interval,
      filterStates: filterStates
    };
  },
  getMarketPricing: () => {
    console.log("Loading market pricing");
    return {
      type: propertiesAction.GET_MARKET_PRICING
    };
  },
  getMarketStats: () => {
    return {
      type: propertiesAction.GET_MARKET_STATS
    };
  },
  getProjectedRent: () => {
    console.log("Loading projected rent");
    return {
      type: propertiesAction.GET_PROJECTED_RENT
    };
  }

};
export default propertiesAction;

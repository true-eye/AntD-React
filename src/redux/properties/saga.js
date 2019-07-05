import { all, takeEvery, fork, call, put } from 'redux-saga/effects';
import actions from './actions';
import ListingService from '../../services/ListingService';
import { push } from 'react-router-redux';

export function* getCompetitionRequest() {
  yield takeEvery(actions.GET_COMPETITION, function*(payload) {
    const properties = yield call(ListingService.getCurrentPropertyCompetition, payload.filter);
    // console.log(properties);
    yield put({
      type: actions.SET_COMPETITION,
      competition: properties
    });

  });
}

export function* getPropertyCompetitionRequest() {
  yield takeEvery(actions.GET_PROPERTY_COMPETITION, function*(payload) {
    console.log(payload.filter['limit']);
    console.log(payload.filter.limit);
    if(payload.filter['limit'] <= 10) {
      yield put({
        type: 'TOGGLE_LISTING_MODAL'
      });
    }

    const properties = yield call(ListingService.getPropertyCompetition, payload.id, payload.filter);
    // console.log(properties);
    yield put({
      type: actions.SET_PROPERTY_COMPETITION,
      competition: properties,
      selectedPropertyId: payload.id
    });

  });
}

export function* getMarketBookingRequest() {
  yield takeEvery(actions.GET_MARKET_BOOKING, function*() {
    const market_bookings = yield call(ListingService.getCurrentListingBooking);
    // console.log(market_bookings);
    yield put({
      type: actions.SET_MARKET_BOOKING,
      bookings: market_bookings
    });

  });
}

export function* getCalendarPricingRequest() {
  yield takeEvery(actions.GET_CAL_PRICING, function*(payload) {
    const pricings = yield call(ListingService.getPricingStatsWithCompetitionByDay, payload.calDate, payload.interval, payload.filterStates);
    yield put({
      type: actions.SET_CAL_PRICING,
      calendarPricings: pricings
    });

  });
}

export function* getCalendarBookingRequest() {
  yield takeEvery(actions.GET_CAL_BOOKING, function*(payload) {
    const bookings = yield call(ListingService.getBookingStatsWithCompetitionByDay, payload.calDate, payload.interval, payload.filterStates);
    yield put({
      type: actions.SET_CAL_BOOKING,
      calendarBookings: bookings
    });

  });
}

export function* getCalendarBookingMonthRequest() {
  yield takeEvery(actions.GET_CAL_BOOKING_MONTH, function*(payload) {
    const bookings = yield call(ListingService.getBookingStatsWithCompetitionByMonth, payload.calDate, payload.interval, payload.filterStates);
    yield put({
      type: actions.SET_CAL_BOOKING_MONTH,
      calendarBookingsMonthStat: bookings
    });

  });
}

export function* getCalendarPricingMonthRequest() {
  yield takeEvery(actions.GET_CAL_PRICING_MONTH, function*(payload) {
    const bookings = yield call(ListingService.getPricingStatsWithCompetitionByMonth, payload.calDate, payload.interval, payload.filterStates);
    yield put({
      type: actions.SET_CAL_PRICING_MONTH,
      calendarPricingsMonthStat: bookings
    });

  });
}

export function* getCalendarPricingDayRequest() {
  yield takeEvery(actions.GET_CAL_PRICING_DAY, function*(payload) {
    const bookings = yield call(ListingService.getPricingStatsForDay, payload.calDate, payload.filterStates);
    console.log(bookings);
    yield put({
      type: actions.SET_CAL_PRICING_DAY,
      calendarPricingsDayStat: bookings
    });

  });
}

export function* getMarketPricingRequest() {
  yield takeEvery(actions.GET_MARKET_PRICING, function*() {
    const market_pricing = yield call(ListingService.getCurrentPropertyPricing);
    // console.log(market_pricing);
    yield put({
      type: actions.SET_MARKET_PRICING,
      pricing: market_pricing
    });

  });
}

export function* getMarketStatsRequest() {
  yield takeEvery(actions.GET_MARKET_STATS, function*() {
    const market_stats = yield call(ListingService.getMarketStats);

    yield put({
      type: actions.SET_MARKET_STATS,
      stats: market_stats
    });

  });
}

export function* getProjectedRentRequest() {
  yield takeEvery(actions.GET_PROJECTED_RENT, function*() {
    const rent = yield call(ListingService.getCurrentProjectedRent);
    // console.log(rent);
    yield put({
      type: actions.SET_PROJECTED_RENT,
      projectedRent: rent
    });

  });
}

export function* gotoLitingPageRequest() {
  yield takeEvery(actions.GOTO_LISTING_PAGE, function*(payload) {
    console.log("push to listing page: ", payload.listingId);
    yield put(push(`/dashboard/listing/${payload.listingId}`));

  });
}

export default function* rootSaga() {
  yield all([
    fork(getCompetitionRequest),
    fork(getPropertyCompetitionRequest),
    fork(getCalendarBookingRequest),
    fork(getCalendarBookingMonthRequest),
    fork(getCalendarPricingMonthRequest),
    fork(getCalendarPricingDayRequest),
    fork(getCalendarPricingRequest),
    fork(getMarketBookingRequest),
    fork(getMarketPricingRequest),
    fork(getProjectedRentRequest),
    fork(gotoLitingPageRequest),
    fork(getMarketStatsRequest)
  ]);
}

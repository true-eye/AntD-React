import { all, takeEvery, fork, call, put } from 'redux-saga/effects';
import actions from './actions';
import ListingService from '../../services/ListingService';
import UserService from '../../services/UserService';

export function* getListingRequest() {
  yield takeEvery(actions.GET_LISTING, function*(payload) {
    const listing = yield call(ListingService.getListing, payload.id);
    // console.log(properties);
    yield put({
      type: actions.SET_LISTING,
      listing: listing
    });

  });
}
export function* getUserListingsRequest() {
  yield takeEvery(actions.GET_USER_LISTINGS, function*(payload) {
    const listings = yield call(UserService.getUserListings);
    // console.log(properties);
    yield put({
      type: actions.SET_USER_LISTINGS,
      listings: listings
    });

  });
}

export default function* rootSaga() {
  yield all([
    fork(getListingRequest),
    fork(getUserListingsRequest)
  ]);
}

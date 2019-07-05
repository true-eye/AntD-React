import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from './actions';
import authActions from '../auth/actions';
import UserService from '../../services/UserService';
import SecurityService from '../../services/SecurityService';
import { clearToken } from '../../helpers/utility';

export function* changePropertyRequest() {
  yield takeEvery(actions.CHANGE_PROPERTY, function*(payload) {
    const user = yield call(UserService.switchProperty, payload.key.key);
    yield put({
      type: authActions.SET_USER,
      user: user
    });

  });
}

export function* changeListingRequest() {
  yield takeEvery(actions.CHANGE_LISTING, function*(payload) {
    const user = yield call(UserService.switchListing, payload.key.key);
    yield put({
      type: authActions.SET_USER,
      user: user
    });

  });
}

export function* setupDemoRequest() {

}

export default function* rootSaga() {
  yield all([
    fork(changePropertyRequest),
    fork(changeListingRequest),
    fork(setupDemoRequest),
  ]);
}

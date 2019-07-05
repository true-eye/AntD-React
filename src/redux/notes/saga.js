import { all, takeEvery, fork, call, put } from 'redux-saga/effects';
import actions from './actions';
import UserService from '../../services/UserService';
import authActions from '../auth/actions';

export function* changeNote() {
  yield takeEvery(actions.CHANGE_NOTE, function*(payload) {
    const user = yield call(UserService.markNotificationRead, payload.selectedId);
    console.log(user);
    yield put({
      type: authActions.SET_USER,
      user: user
    });

  });

}
export default function* rootSaga() {
  yield all([
    fork(changeNote),
  ]);
}

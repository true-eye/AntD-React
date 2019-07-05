import { all } from 'redux-saga/effects';
import appSagas from './app/saga';
import authSagas from './auth/saga';
import mailSagas from './mail/saga';
import notesSagas from './notes/saga';
import settingsSagas from './settings/saga';
import propertiesSagas from './properties/saga';
import listingsSagas from './listings/saga';
import cardsSagas from './card/saga';

export default function* rootSaga(getState) {
  yield all([
    appSagas(),
    authSagas(),
    mailSagas(),
    notesSagas(),
    propertiesSagas(),
    settingsSagas(),
    cardsSagas(),
    listingsSagas(),
  ]);
}

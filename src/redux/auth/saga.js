import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { push } from "react-router-redux";
import { getToken, clearToken } from "../../helpers/utility";
import actions from "./actions";
import SecurityService from "../../services/SecurityService";
import UserService from "../../services/UserService";

export function* loginRequest() {}

export function* signupRequest() {}

export function* loginSuccess() {}

export function* setUser() {}

export function* checkUserSignup(user) {}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    console.log("Logging out");
    clearToken();
    yield put(push("/"));
  });
}
export function* checkAuthorization() {}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(signupRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(setUser),
    fork(logout)
  ]);
}

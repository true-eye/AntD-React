import { clearToken } from '../../helpers/utility';
import axios from 'axios';

const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_ERROR: 'SIGNUP_ERROR',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  SET_USER: 'SET_USER',
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  // login: () => ({
  //   type: actions.LOGIN_REQUEST
  // }),
  login: credentials => {
    return (dispatch, getState) => {
      // const contacts = getState().Contacts.contacts;
      // console.log(credentials);
      clearToken();
      dispatch({
        type: actions.LOGIN_REQUEST,
        credentials: credentials
      });
    };
  },
  signup: (credentials) => {
    return (dispatch, getState) => {
      // const contacts = getState().Contacts.contacts;
      // console.log(credentials);
      console.log("signup");
      clearToken();
      dispatch({
        type: actions.SIGNUP_REQUEST,
        credentials: credentials
      });
    };
  },
  logout: () => {
    return (dispatch, getState) => {
      clearToken();
      dispatch({
        type: actions.LOGOUT
      });
    };
  }
};
export default actions;

axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (401 === error.response.status) {
    console.log('Not logged in, redirecting...');
    clearToken();
    actions.logout();
  }
  return Promise.reject(error);
});

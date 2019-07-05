import React  from 'react';
import actions from "./actions";
import message from "../../components/feedback/message";
import MessageContent from "../../containers/Feedback/Message/message.style";

const initState = {
  idToken: null,
  currentUser: null,
  signupError: null,
  loginError: null,
  loadingSignup: false
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.SIGNUP_REQUEST:
      return {
        ...state,
        loadingSignup: true
      };
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        loadingSignup: true
      };
    case actions.LOGIN_SUCCESS:
      return {
        idToken: action.token,
        loadingSignup: false
      };
    case actions.LOGIN_ERROR:
      message.error(
        <MessageContent>
          {action.error}
        </MessageContent>,
        10
      );
      return {
        loginError: action.error,
        loadingSignup: false
      };
    case actions.SET_USER:
      return {
        currentUser: action.user
      };
    case actions.LOGOUT:
      return initState;
    case actions.SIGNUP_ERROR:
      message.error(
        <MessageContent>
          {Object.keys(action.error).map((key,i) => {
            return (
              <div key={i} className="" style={{display: "flex", width: "100%"}}>
                <span style={{paddingRight: "3px", textTransform: "capitalize"}}><strong>{key.replace(/_/g,' ')}:</strong></span>
                <span>{action.error[key]}</span>
              </div>
            );
          })}
        </MessageContent>,
        10
      );
      return {
        ...state,
        signupError: action.error,
        loadingSignup: false
      };
    default:
      return state;
  }
}

import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Button from "../../components/uielements/button";
import authAction from "../../redux/auth/actions";
import appAction from "../../redux/app/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";
import Spin from "../Feedback/Spin/spin.style";

const { login } = authAction;
const { clearMenu } = appAction;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    user: "",
    pass: ""
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    const { login, clearMenu } = this.props;
    // login(this.state);
    clearMenu();
    this.props.history.push("/dashboard");
  };
  onKeyPress = e => {
    if (e.which === 13) {
      this.handleLogin();
    }
  };
  render() {
    const from = { pathname: "/dashboard" };
    const { redirectToReferrer } = this.state;
    const onUserChange = event => {
      const value = event.target.value;
      this.setState({ user: value });
    };
    const onPassChange = event => {
      const value = event.target.value;
      this.setState({ pass: value });
    };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <Spin spinning={this.props.loadingSignup} size="large">
              <div className="isoSignInForm">
                <div className="isoInputWrapper">
                  <Input
                    size="large"
                    placeholder="Email"
                    value={this.state.user}
                    onChange={onUserChange}
                    autoFocus
                  />
                </div>

                <div className="isoInputWrapper">
                  <Input
                    size="large"
                    type="password"
                    placeholder="Password"
                    value={this.state.pass}
                    onChange={onPassChange}
                    onKeyPress={this.onKeyPress}
                  />
                </div>

                <div className="isoInputWrapper isoLeftRightComponent">
                  <Button type="primary" onClick={this.handleLogin}>
                    <IntlMessages id="page.signInButton" />
                  </Button>
                </div>

                <div className="isoCenterComponent isoHelperWrapper">
                  {/* <Link to="/forgotpassword" className="isoForgotPass">
                    <IntlMessages id="page.signInForgotPass" />
                  </Link> */}
                  <Link to="/signup">
                    <IntlMessages id="page.signInCreateAccount" />
                  </Link>
                </div>
              </div>
            </Spin>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false,
    loginError: state.Auth.loginError,
    loadingSignup: state.Auth.loadingSignup
  }),
  { login, clearMenu }
)(SignIn);

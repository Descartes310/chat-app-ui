/**
 * App.js Layout Start Here
 */
import Chat from './routes/chat';
import SignIn from './routes/login';
import SignUp from './routes/signup';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { AUTH, HOME } from "./urls/frontendUrl";
import { getAuthToken } from "./helpers/tokens";
import { isUserIntoStoreValid } from "./helpers/helpers";
import { setAuthUser, loginIntoStore } from './actions/AuthActions';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

type MyProps = {
  setAuthUser: any,
  loginIntoStore: any,
  authUser: any
};
type MyState = {};

class App extends Component<MyProps, MyState> {

  componentDidMount() {
    console.log(this.props.authUser.data);
    if (!this.props.authUser.data) {
      this.refreshUserDatas();
    }
  }

  /**
   * Check whether the current user is a new or not
   */
  refreshUserDatas = () => {
    console.log("Je suis dans le refresh user");
    this.props
      .setAuthUser()
      .then(() => this.refreshTokens());
  };

  /**
   * Insert tokens data into store
   */
  refreshTokens = () => {
    console.log("Je suis dans le refresh token");
    const { accessToken, refreshToken, expiresIn, tokenType } = getAuthToken();
    if (refreshToken && accessToken)
      this.props.loginIntoStore({
        accessToken,
        tokenType,
        expiresIn,
        refreshToken,
      });
  };


  render() {
    console.log("Je suis dans le refresh render => "+ window.location.pathname);
    return (
      <>
        <BrowserRouter>
          {this.props.authUser.data ? (
            <>
              <Routes>
                <Route path="/" element={<Chat />} />
                <Route path={HOME} element={<Chat />} />
              </Routes>
              {/* <Navigate to={HOME} replace /> */}
            </>
          ) : (
            <Routes>
              <Route path={AUTH.LOGIN} element={<SignIn />} />
              <Route path={AUTH.REGISTER} element={<SignUp />} />
            </Routes>
          )}
        </BrowserRouter>
      </>
    )
  }
}

// map state to props
const mapStateToProps = (state: any) => {
  const { authUser, tokens } = state
  return { authUser, tokens: tokens.data };
};

export default connect(mapStateToProps, { setAuthUser, loginIntoStore })(App);
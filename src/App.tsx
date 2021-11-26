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
import blue from "@material-ui/core/colors/blue";
import CssBaseline from "@material-ui/core/CssBaseline";
import { setAuthUser, loginIntoStore } from './actions/AuthActions';
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

type MyProps = {
  setAuthUser: any,
  loginIntoStore: any,
  authUser: any
};
type MyState = {};

const theme = createTheme({
  palette: {
    primary: blue
  },
  typography: {
    htmlFontSize: 1,
    fontSize: 0.8
  }
});

class App extends Component<MyProps, MyState> {

  componentDidMount() {
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
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    )
  }
}

// map state to props
const mapStateToProps = (state: any) => {
  const { authUser, tokens } = state
  return { authUser, tokens: tokens.data };
};

export default connect(mapStateToProps, { setAuthUser, loginIntoStore })(App);
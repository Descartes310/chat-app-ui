/**
 * App.js Layout Start Here
 */
import { useEffect } from 'react';
import { connect } from 'react-redux';
import AppSignIn from './routes/login';
import AppSignUp from './routes/signup';
import { AUTH } from "./urls/frontendUrl";
import { getAuthToken } from "./helpers/tokens";
import { isUserIntoStoreValid } from "./helpers/helpers";
import { setAuthUser, loginIntoStore } from './actions/AuthActions';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

function App(props) {

  useEffect(() => {
    isNewUser();
  }, [])

  /**
   * Check whether the current user is a new or not
   */
  const isNewUser = () => {
    props
      .setAuthUser()
      .then(() => refreshTokens());
  };

  /**
   * Insert tokens data into store
   */
  const refreshTokens = () => {
    const { accessToken, refreshToken, expiresIn, tokenType } = getAuthToken();
    if (refreshToken && accessToken)
      props.loginIntoStore({
        accessToken,
        tokenType,
        expiresIn,
        refreshToken,
      });
  };

  const _isUserIntoStoreValid = isUserIntoStoreValid(props.authUser.data);

  return (
    <>
      <BrowserRouter>
        {_isUserIntoStoreValid ? (
          <Switch>
            <Route path={'/'} component={Dashboard} />
            <Redirect to={'/'} />
          </Switch>
        ) : (
          <Switch>
            <Route path={AUTH.LOGIN} component={AppSignIn} />
            <Route path={AUTH.REGISTER} component={AppSignUp} />
            <Redirect to={AUTH.LOGIN} />
          </Switch>
        )}
      </BrowserRouter>
    </>
  )
}

// map state to props
const mapStateToProps = ({ authUser }) => {
  return { authUser };
};

export default connect(mapStateToProps, { setAuthUser, loginIntoStore })(App);
/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import tokensReducer from './TokensReducer';
import authUserReducer from './AuthUserReducer';

const reducers = combineReducers({
    tokens: tokensReducer,
    authUser: authUserReducer,
});

export default reducers;
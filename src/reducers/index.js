/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import chatReducer from './ChatReducer';
import tokensReducer from './TokensReducer';
import authUserReducer from './AuthUserReducer';

const reducers = combineReducers({
    tokens: tokensReducer,
    selectedChat: chatReducer,
    authUser: authUserReducer,
});

export default reducers;
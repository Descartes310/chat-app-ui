/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import {
    LOGIN_USER,
    LOGOUT_USER,
    SET_AUTH_USER,
    CLEAR_AUTH_USER,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    SET_AUTH_USER_SUCCESS,
    SET_AUTH_USER_FAILURE,
} from './types';
import api from '../api';
import AppConfig from '../constants/AppConfig';
import { USER, AUTH } from '../urls/backendUrl';
import { AUTH as FRONTEND_AUTH } from '../urls/frontendUrl';
import { removeAuthToken, saveAuthToken } from "../helpers/tokens";
import { getFullAuthorisationRequestConfig } from "../helpers/helpers";

/**
 * Redux Action get auth information
 */
export const setAuthUser = () => (dispatch: any) => {
    dispatch({ type: SET_AUTH_USER });

    return api
        .get(`${USER.KYC}`)
        .then((response: any) => {
            dispatch({ type: SET_AUTH_USER_SUCCESS, payload: response.data });
            return Promise.resolve();
        })
        .catch((error: any) => {
            dispatch({ type: SET_AUTH_USER_FAILURE });
            if (!window.location.pathname.includes('login') && !window.location.pathname.includes('register'))
                window.location.href = FRONTEND_AUTH.LOGIN;
            return Promise.reject();
        });
};

/**
 * Redux Action To Sigin User with login and password
 */
export const loginUserWithLoginAndPassword = (data: any) => (dispatch: any) => {
    dispatch({ type: LOGIN_USER });

    const config = getFullAuthorisationRequestConfig();

    const _data = { ...data };
    _data.username = data.login;
    _data.grantType = AppConfig.oauth.grantType;
    _data.clientId = AppConfig.oauth.clientId;

    delete _data.login;

    return api
        .post(AUTH.LOGIN, _data, config)
        .then((response: any) => {
            const data = {
                accessToken: response.data.accessToken,
                tokenType: response.data.tokenType,
                expiresIn: response.data.expiresIn,
                refreshToken: response.data.refreshToken,
            };

            // Persist data into localstorage
            saveAuthToken(data.accessToken, data.tokenType, data.expiresIn, data.refreshToken);

            // Fetch user data
            dispatch(setAuthUser());

            // Persist data into store
            dispatch({ type: LOGIN_USER_SUCCESS, payload: data });

            return Promise.resolve();
        })
        .catch((error: any) => {
            dispatch({ type: LOGIN_USER_FAILURE, payload: error });
            return Promise.reject();
        });
};

/**
 * Redux Action To register User
 */
 export const registerUser = (data: any) => (dispatch: any) => {

    const config = getFullAuthorisationRequestConfig();

    return api.post(AUTH.REGISTER, data, config)
        .then((response: any) => {
            const data = {
                accessToken: response.data.accessToken,
                tokenType: response.data.tokenType,
                expiresIn: response.data.expiresIn,
                refreshToken: response.data.refreshToken,
            };

            // Persist data into localstorage
            saveAuthToken(data.accessToken, data.tokenType, data.expiresIn, data.refreshToken);

            // Fetch user data
            dispatch(setAuthUser());

            // Persist data into store
            dispatch({ type: LOGIN_USER_SUCCESS, payload: data });

            return Promise.resolve();
        })
        .catch((error: any) => {
            dispatch({ type: LOGIN_USER_FAILURE, payload: error });
            return Promise.reject();
        });
};

export const loginIntoStore = (data: any) => (dispatch: any) => {
    // Persist data into store
    dispatch({ type: LOGIN_USER });
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
};

/**
 * Redux Action To Signout User From  Firebase
 */
export const logout = () => (dispatch: any) => {
    api.delete(`${AUTH.LOGOUT}`)
    removeAuthToken();
    dispatch({ type: LOGOUT_USER, payload: null });
    dispatch({ type: CLEAR_AUTH_USER, payload: null });
    window.location.href = FRONTEND_AUTH.LOGIN;
};
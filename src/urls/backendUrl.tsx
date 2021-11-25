import AppConfig from '../constants/AppConfig';

export const BASE = `${AppConfig.api.baseUrl}`;

export const AUTH = {
    LOGIN: 'oauth/token',
    REGISTER: 'auth/register'
};

export const USER = {
    KYC: 'api/users/kyc'
};
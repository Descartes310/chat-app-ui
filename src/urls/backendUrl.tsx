import AppConfig from '../constants/AppConfig';

export const BASE = `${AppConfig.api.baseUrl}`;

export const AUTH = {
    LOGIN: 'oauth/token',
    REGISTER: 'auth/register'
};

export const USER = {
    KYC: 'api/users/kyc'
};

export const CHAT = {
    SELF: 'api/chats',
    MESSAGE: 'api/chats/{id}/messages',
}
import AppConfig from '../constants/AppConfig';

export const BASE = `${AppConfig.api.baseUrl}`;

export const AUTH = {
    LOGIN: 'oauth/token',
    REGISTER: 'auth/register',
    LOGOUT: 'api/users/logout',
};

export const USER = {
    KYC: 'api/users/kyc',
    GET: 'api/users'
};

export const SOCKET_URL = BASE+'ws-chat/';

export const CHAT = {
    SELF: 'api/chats',
    MESSAGE: 'api/chats/{id}/messages',
}
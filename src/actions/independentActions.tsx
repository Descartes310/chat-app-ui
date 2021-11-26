import api from '../api';
import { CHAT, USER } from '../urls/backendUrl';
import { makeRequest } from '../helpers/helpers';

export const getChats = () => {
    return makeRequest('get', CHAT.SELF);
};

export const getMessages = (id: any) => {
    return makeRequest('get', CHAT.MESSAGE.replace('{id}', id));
};

export const getUsers = () => {
    return makeRequest('get', USER.GET);
};

export const sendMessages = (id: any, data: any, config: any) => {
    const url = CHAT.MESSAGE.replace('{id}', id);
    return new Promise((resolve, reject) => {
        api.post(url, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};
import { CHAT } from '../urls/backendUrl';
import { makeRequest } from "../helpers/helpers";

export const getChats = () => {
    return makeRequest('get', CHAT.SELF);
};

export const getMessages = (id: any) => {
    return makeRequest('get', CHAT.MESSAGE.replace('{id}', id));
};

export const sendMessages = (id: any, data: any) => {
    return makeRequest('post', CHAT.MESSAGE.replace('{id}', id), data);
};
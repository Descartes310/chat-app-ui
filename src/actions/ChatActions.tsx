/**
 * Auth Actions
 */
import {
    SELECT_CHAT
} from './types';

/**
 * Redux Action set selected chat
 */
export const setSelectedChat = (data: any) => ({
    type: SELECT_CHAT,
    payload: data
});
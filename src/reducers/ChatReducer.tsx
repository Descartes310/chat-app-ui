/**
 * Chat Reducers
 */
import {
    SELECT_CHAT
} from '../actions/types';

/**
 * initial state
 */
 const INIT_STATE = {
    data: null,
};

const chatReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {

        case SELECT_CHAT:
            return { ...state, data: action.payload };

        default: return { ...state };
    }
}

export default chatReducer;
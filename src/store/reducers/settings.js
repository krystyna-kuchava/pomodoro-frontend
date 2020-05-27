import {
    GET_SETTINGS
} from '../actions/settings';

export function Settings(state = { }, action) {

    switch (action.type) {

        case GET_SETTINGS:
            return {
                ...state,
                settings: action.payload,
            };

        default: return state;
    }
}

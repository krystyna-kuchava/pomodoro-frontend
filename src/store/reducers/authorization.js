import {
    AUTHORIZATION
} from '../actions/authorization';

export function Authorization(state = {  }, action) {

    switch (action.type) {
        case AUTHORIZATION:
            return {
                ...state,
                ...action.payload,
            };


        default: return state;
    }
}

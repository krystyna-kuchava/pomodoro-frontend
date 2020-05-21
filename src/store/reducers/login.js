import {
    LOGIN
} from '../actions/login';

export function Login(state = { name: 'Kris' }, action) {

    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                ...action.payload,
            };


        default: return state;
    }
}

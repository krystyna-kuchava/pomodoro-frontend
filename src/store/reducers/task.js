import {
    GET_TASK,
    UPDATE_TASK
} from '../actions/task';

export function Task(state = { name: 'Kris' }, action) {

    switch (action.type) {
        case GET_TASK:
            return state;

        case UPDATE_TASK:
            return state;

        default: return state;
    }
}

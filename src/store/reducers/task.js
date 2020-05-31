import {
    GET_TASK,
    UPDATE_TASK,
    GET_TODO_TASKS,
    GET_DONE_TASKS,
    GET_GLOBAL_TASKS,
    START_TASKS
} from '../actions/task';

export function Task(state = {  }, action) {
    switch (action.type) {
        case GET_TASK:
            return state;

        case GET_TODO_TASKS:
            return {
                ...state,
                todoTasksList: action.payload,
            };

        case GET_DONE_TASKS:
            return {
                ...state,
                doneTasksList: action.payload,
            };

        case GET_GLOBAL_TASKS:
            return {
                ...state,
                globalTasksList: action.payload,
            };

        case START_TASKS:
            return {
                ...state,
                activeTask: action.payload,
            };

        default: return state;
    }
}

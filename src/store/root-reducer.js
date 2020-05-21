import {combineReducers} from 'redux';

import { Task } from './reducers/task';
import { Login } from './reducers/login';

export const rootReducer = combineReducers({
    Task,
    Login
});

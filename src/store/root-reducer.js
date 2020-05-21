import {combineReducers} from 'redux';

import { Task } from './reducers/task';
import { Authorization } from './reducers/authorization';

export const rootReducer = combineReducers({
    Task,
    Authorization
});

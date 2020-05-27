import {combineReducers} from 'redux';

import { Task } from './reducers/task';
import { Authorization } from './reducers/authorization';
import { Settings } from './reducers/settings';

export const rootReducer = combineReducers({
    Task,
    Authorization,
    Settings
});

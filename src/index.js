import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/configure-store';

import './styles.less';
import routerPaths from "./constants/router-paths";

import {DefaultPage} from './pages/default-page';
import {LoginPageConnector} from './pages/login-page';
import {SignUpPageConnector} from './pages/sign-up-page';
import {TasksListPageConnector} from './pages/tasks-list-page';
import {SettingsPageConnector} from './pages/settings-page';
import {ReportsPageConnector} from './pages/reports-page';
import {TimerPageConnector} from './pages/timer-page';


const App = () => (
    <Provider store={store}>
        <Router>
            <Route
                path={routerPaths.DEFAULT}
                exact
                component={DefaultPage}
            />

            <Route
                path={routerPaths.LOGIN}
                exact
                component={LoginPageConnector}
            />

            <Route
                path={routerPaths.SIGN_UP}
                exact
                component={SignUpPageConnector}
            />

            <Route
                path={routerPaths.TASKS_LIST}
                exact
                component={TasksListPageConnector}
            />

            <Route
                path={routerPaths.SETTINGS}
                exact
                component={SettingsPageConnector}
            />

            <Route
                path={routerPaths.REPORT}
                exact
                component={ReportsPageConnector}
            />

            <Route
                path={routerPaths.TIMER}
                exact
                component={TimerPageConnector}
            />

        </Router>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));

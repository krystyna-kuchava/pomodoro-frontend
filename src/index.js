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
                component={DefaultPage}
            />

            <Route
                path={routerPaths.REPORT}
                exact
                component={DefaultPage}
            />

        </Router>

        {/*<LoginConnector />*/}
        {/*<BrowserRouter>
            <div className="App">
                <Switch>
                    <Route
                        path={routerPaths.DEFAULT}
                        exact
                        //component={TASKS_LIST}
                    />
                    <Route
                        path={routerPaths.LOGIN}
                        exact
                        //component={EditPromotionDetails}
                    />
                    <Route
                        path={routerPaths.SIGN_UP}
                        exact
                        //component={OrderList}
                    />
                    <Route
                        path={routerPaths.TASKS_LIST}
                        //component={CreationPromotion}
                    />
                    <Route
                        path={routerPaths.SETTINGS}
                        exact
                        //component={PromotionDetails}
                    />
                    <Route
                        path={routerPaths.REPORT}
                        exact
                        //component={OrderSettings}
                    />
                    <Route
                        path={routerPaths.TIMER}
                        exact
                        //component={OrderSettings}
                    />
                </Switch>
            </div>
        </BrowserRouter>*/}
    </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));

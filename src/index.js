import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { store } from './store/configure-store';

import './styles.less';
import routerPaths from "./constants/router-paths";
import {LoginConnector} from './components/login';


const App = () => (
    <Provider store={store}>

        <LoginConnector />
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

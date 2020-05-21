import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

import routerPaths from "../../constants/router-paths";

export class DefaultPage extends Component {

    constructor() {
        super();

        this.state = {

        };
    }

    render() {

        return (
            <div className="default-page-content">
                <h1>Welcome to Pomodoro</h1>

                <div className="default-page-actions">
                    <NavLink
                        exact
                        to={routerPaths.LOGIN}
                        className="subtitle default-page-link"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        exact
                        to={routerPaths.SIGN_UP}
                        className="subtitle default-page-link"
                    >
                        Sign up
                    </NavLink>
                </div>
            </div>
        );
    }
}

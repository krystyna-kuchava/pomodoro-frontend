import React, {Component} from 'react';
import { Redirect } from 'react-router';
import routerPaths from "../../constants/router-paths";

export class LoginPage extends Component {

    constructor() {
        super();

        this.state = {
            redirect: false
        };

        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onLoginClick(e)  {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        this.props.login({email, password}, () => {
            this.setState({redirect: true});
        });
    };

    render() {

        if (this.state.redirect) {
            return <Redirect push to={routerPaths.TASKS_LIST} />;
        }

        return (
            <div className="login-content">


                <h1>Login</h1>

                <form className="login-form">
                    <label className="paragraph login-form-item">
                        E-mail:
                        <input type="text"  id="email"/>
                    </label>
                    <label className="paragraph login-form-item">
                        Password:
                        <input type="password"  id="password"/>
                    </label>

                    <button className="paragraph login-submit" onClick={this.onLoginClick} type="submit">
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

import React, {Component} from 'react';
import { Redirect } from 'react-router';
import routerPaths from "../../constants/router-paths";

export class SignUpPage extends Component {

    constructor() {
        super();

        this.state = {
            redirect: false
        };

        this.onSignUpClick = this.onSignUpClick.bind(this);
    }

    onSignUpClick(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        this.props.signUp({
            name,
            email,
            password
        }, () => {
            this.setState({redirect: true});
        });
    };

    render() {

        if (this.state.redirect) {
            return <Redirect push to={routerPaths.TASKS_LIST} />;
        }

        return (
            <div className="sign-up-content">
                <h1>Sign up</h1>

                <form className="sign-up-form">
                    <label className="paragraph sign-up-form-item">
                        Name:
                        <input type="text" id="name"/>
                    </label>
                    <label className="paragraph sign-up-form-item">
                        E-mail:
                        <input type="text" id="email"/>
                    </label>
                    <label className="paragraph sign-up-form-item">
                        Password:
                        <input type="password" id="password"/>
                    </label>

                    <button className="paragraph sign-up-submit" onClick={this.onSignUpClick} type="submit">
                        Sign up
                    </button>
                </form>
            </div>
        );
    }
}

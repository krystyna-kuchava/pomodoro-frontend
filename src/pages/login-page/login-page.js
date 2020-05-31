import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { Crypt, RSA } from 'hybrid-crypto-js';
import CryptoJS from 'crypto-js';
import routerPaths from "../../constants/router-paths";
import {encryptKey} from "../../constants/encrypt-key";
import {validateEmail} from '../../validation/user/user-validation';
import {validatePassword} from '../../validation/user/user-validation';

export class LoginPage extends Component {

    constructor() {
        super();

        this.state = {
            redirect: false,
            isEmailError: true,
            isPasswordError: true,
        };

        this.onLoginClick = this.onLoginClick.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    onLoginClick(e)  {
        e.preventDefault();

        if (!this.state.isEmailError && !this.state.isPasswordError) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            var encryptedPassword = CryptoJS.AES.encrypt(password, encryptKey).toString();

            this.props.login({email, encryptedPassword, encryptKey}, () => {
                this.setState({redirect: true});
            });
        }
    };

    validateEmail() {
        const email = document.getElementById('email').value;

        if (!validateEmail(email)) {
            this.setState({isEmailError: true});
        } else {
            this.setState({isEmailError: false});
        }

    }

    validatePassword() {
        const password = document.getElementById('password').value;

        if (!validatePassword(password)) {
            this.setState({isPasswordError: true});
        } else {
            this.setState({isPasswordError: false});
        }
    }

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
                        <input type="text"  id="email" onChange={this.validateEmail}/>
                        {this.state.isEmailError ? (
                            <p className="error-message">Should not be empty. Right format: test@test.com</p>
                        ) : (<></>)}
                    </label>
                    <label className="paragraph login-form-item">
                        Password:
                        <input type="password"  id="password" onChange={this.validatePassword}/>
                        {this.state.isPasswordError ? (
                            <p className="error-message">Should not be empty. Right format: at least 8 symbols</p>
                        ) : (<></>)}
                    </label>

                    <button className="paragraph login-submit" onClick={this.onLoginClick} type="submit">
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

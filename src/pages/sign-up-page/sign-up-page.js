import React, {Component} from 'react';
import { Redirect } from 'react-router';
import CryptoJS from 'crypto-js';
import routerPaths from "../../constants/router-paths";
import {validateEmail} from '../../validation/user/user-validation';
import {validatePassword} from '../../validation/user/user-validation';
import {validateName} from '../../validation/user/user-validation';
import {encryptKey} from "../../constants/encrypt-key";

export class SignUpPage extends Component {

    constructor() {
        super();

        this.state = {
            redirect: false,
            isEmailError: true,
            isPasswordError: true,
            isNameError: true,
        };

        this.onSignUpClick = this.onSignUpClick.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateName = this.validateName.bind(this);
    }

    onSignUpClick(e) {
        e.preventDefault();

        if (!this.state.isEmailError && !this.state.isPasswordError) {

        }
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const encryptedPassword = CryptoJS.AES.encrypt(password, encryptKey).toString();

        this.props.signUp({
            name,
            email,
            encryptedPassword
        }, () => {
            this.setState({redirect: true});
        });
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

    validateName() {
        const name = document.getElementById('name').value;

        if (!validateName(name)) {
            this.setState({isNameError: true});
        } else {
            this.setState({isNameError: false});
        }
    }

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
                        <input type="text" id="name" onChange={this.validateName}/>
                        {this.state.isNameError ? (
                            <p className="error-message">Should not be empty</p>
                        ) : (<></>)}
                    </label>
                    <label className="paragraph sign-up-form-item">
                        E-mail:
                        <input type="text" id="email" onChange={this.validateEmail}/>
                        {this.state.isEmailError ? (
                            <p className="error-message">Should not be empty. Right format: test@test.com</p>
                        ) : (<></>)}
                    </label>
                    <label className="paragraph sign-up-form-item">
                        Password:
                        <input type="password" id="password" onChange={this.validatePassword}/>
                        {this.state.isPasswordError ? (
                            <p className="error-message">Should not be empty. Right format: at least 8 symbols</p>
                        ) : (<></>)}
                    </label>

                    <button className="paragraph sign-up-submit" onClick={this.onSignUpClick} type="submit">
                        Sign up
                    </button>
                </form>
            </div>
        );
    }
}

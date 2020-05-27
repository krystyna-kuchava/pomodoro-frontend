import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { Crypt, RSA } from 'hybrid-crypto-js';
import CryptoJS from 'crypto-js';
import routerPaths from "../../constants/router-paths";
import {encryptKey} from "../../constants/encrypt-key";

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

        var encryptedPassword = CryptoJS.AES.encrypt(password, encryptKey).toString();

        var bytes  = CryptoJS.AES.decrypt(encryptedPassword, encryptKey);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);

        console.log(originalText);

        this.props.login({email, encryptedPassword, encryptKey}, () => {
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

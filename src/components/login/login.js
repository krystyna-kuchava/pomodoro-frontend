import React, {Component} from 'react';

export class Login extends Component {

    constructor() {
        super();

        this.state = {
            value: ""
        };

        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onLoginClick()  {

        const loginData = {
            email: 'test@test.com',
            password: '123456'
        };

        this.props.login(loginData);
    };

    render() {

        return (
            <div className="login-content">
                <h1>Login</h1>

                <form className="login-form">
                    <label className="paragraph login-form-item">
                        E-mail:
                        <input type="text" />
                    </label>
                    <label className="paragraph login-form-item">
                        Password:
                        <input type="password" />
                    </label>

                    <button className="paragraph login-submit" onClick={this.onLoginClick} type="submit">Login</button>
                </form>
            </div>
        );
    }
}

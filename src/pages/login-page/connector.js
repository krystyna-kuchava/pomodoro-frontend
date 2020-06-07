import {connect} from 'react-redux';
import {LoginPage} from './login-page';

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (loginData, successCallback, errorCallback) => {
            fetch(`http://localhost:3030/login`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            })
                .then(res => res.json())
                .then((res) => {
                    if (res.token) {
                        localStorage.setItem('token', res.token);
                        dispatch({type: 'AUTHORIZATION', payload: res});
                        successCallback();
                    } else {
                        errorCallback(res.errorMessage);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }
};

export const LoginPageConnector = connect(mapStateToProps, mapDispatchToProps)(LoginPage);


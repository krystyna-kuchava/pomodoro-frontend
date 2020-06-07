import {connect} from 'react-redux';
import {SignUpPage} from './sign-up-page';

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        signUp: (signUpData, successCallback, errorCallback) => {
            fetch(`http://localhost:3030/sign-up`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpData)
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

export const SignUpPageConnector = connect(mapStateToProps, mapDispatchToProps)(SignUpPage);


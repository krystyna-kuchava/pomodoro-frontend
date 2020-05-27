import {connect} from 'react-redux';
import {LoginPage} from './login-page';

import {token} from '../../constants/token';

const mapStateToProps = state => {
    console.log(state);

    return {
        //name: state.Login.name
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (loginData, callback) => {
            console.log(loginData);

            fetch(`http://localhost:3030/login`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': ''
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                //redirect: 'follow', // manual, *follow, error
                //referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(loginData) // body data type must match "Content-Type" header
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res);
                    localStorage.setItem('token', res.token);
                    //token = res.token;
                    dispatch({type: 'AUTHORIZATION', payload: res});
                    callback();
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }
};

export const LoginPageConnector = connect(mapStateToProps, mapDispatchToProps)(LoginPage);


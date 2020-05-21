import {connect} from 'react-redux';
import {Login} from './login';


const mapStateToProps = state => {
    console.log(state);

    return {
        name: state.Login.name
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (loginData) => {
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
                    dispatch({type: 'LOGIN', payload: res});
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }
};

export const LoginConnector = connect(mapStateToProps, mapDispatchToProps)(Login);


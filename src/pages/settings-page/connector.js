import {connect} from 'react-redux';
import {SettingsPage} from './settings-page';


const mapStateToProps = state => {
    console.log(state);

    return {
        //name: state.SignUp.name
    };
};

const mapDispatchToProps = dispatch => {
    return {
        /*signUp: (signUpData, callback) => {
            fetch(`http://localhost:3030/sign-up`, {
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
                body: JSON.stringify(signUpData) // body data type must match "Content-Type" header
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res);
                    dispatch({type: 'AUTHORIZATION', payload: res});
                    callback();
                })
                .catch((err) => {
                    console.log(err);
                });

        }*/
    }
};

export const SettingsPageConnector = connect(mapStateToProps, mapDispatchToProps)(SettingsPage);


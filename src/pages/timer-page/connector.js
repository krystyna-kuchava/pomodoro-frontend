import {connect} from 'react-redux';
import {TimerPage} from './timer-page';

import {token} from '../../constants/token';

const mapStateToProps = state => {
    console.log(state);

    return {
        token: state.Authorization.token,
        taskData: state.Task.activeTask,
        settings: state.Settings.settings,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        /*getDayReport: (token, callback) => {
            fetch(`http://localhost:3030/report/day`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                //redirect: 'follow', // manual, *follow, error
                //referrerPolicy: 'no-referrer', // no-referrer, *client
                //body: JSON.stringify(signUpData) // body data type must match "Content-Type" header
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res);
                    //dispatch({type: 'AUTHORIZATION', payload: res});
                    callback(res);
                })
                .catch((err) => {
                    console.log(err);
                });

        },*/
        /*getMonthReport: (token, callback) => {
            fetch(`http://localhost:3030/report/month`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                //redirect: 'follow', // manual, *follow, error
                //referrerPolicy: 'no-referrer', // no-referrer, *client
                //body: JSON.stringify(signUpData) // body data type must match "Content-Type" header
            })
                .then(res => res.json())
                .then((res) => {
                    //console.log(res);
                    //dispatch({type: 'AUTHORIZATION', payload: res});
                    callback(res);
                })
                .catch((err) => {
                    console.log(err);
                });

        }*/
    }
};

export const TimerPageConnector = connect(mapStateToProps, mapDispatchToProps)(TimerPage);


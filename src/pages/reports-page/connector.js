import {connect} from 'react-redux';
import {ReportsPage} from './reports-page';

import {token} from '../../constants/token';

const mapStateToProps = state => {
    return {
        token: state.Authorization.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDayReport: (token, callback) => {
            fetch(`http://localhost:3030/report/day`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then((res) => {
                    //dispatch({type: 'AUTHORIZATION', payload: res});
                    callback(res);
                })
                .catch((err) => {
                    console.log(err);
                });

        },
        getMonthReport: (token, callback) => {
            fetch(`http://localhost:3030/report/month`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then((res) => {
                    callback(res);
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }
};

export const ReportsPageConnector = connect(mapStateToProps, mapDispatchToProps)(ReportsPage);


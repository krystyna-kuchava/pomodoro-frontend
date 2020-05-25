import {connect} from 'react-redux';
import {ReportsPage} from './reports-page';

const mapStateToProps = state => {
    console.log(state);

    return {
        //name: state.SignUp.name
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDayReport: (callback) => {
            fetch(`http://localhost:3030/report/day`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4b0pNZjN5eXJYNTZWRnlGdldHIiwiaWF0IjoxNTkwNDQzNjkxLCJleHAiOjE1OTA0NTA4OTF9.h7mN47H312QFTym6HUSsAR76iI1D07NExWcB9aAVlnE'
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

        },
        getMonthReport: (callback) => {
            fetch(`http://localhost:3030/report/month`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4b0pNZjN5eXJYNTZWRnlGdldHIiwiaWF0IjoxNTkwNDQzNjkxLCJleHAiOjE1OTA0NTA4OTF9.h7mN47H312QFTym6HUSsAR76iI1D07NExWcB9aAVlnE'
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

        }
    }
};

export const ReportsPageConnector = connect(mapStateToProps, mapDispatchToProps)(ReportsPage);


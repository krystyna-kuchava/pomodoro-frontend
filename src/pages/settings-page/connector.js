import {connect} from 'react-redux';
import {SettingsPage} from './settings-page';


const mapStateToProps = state => {
    console.log(state);

    return {
        settings: state.Settings.settings,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSettings: (token) => {
            fetch(`http://localhost:3030/settings`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res);
                    dispatch({type: 'GET_SETTINGS', payload: res});
                    //callback();
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }
};

export const SettingsPageConnector = connect(mapStateToProps, mapDispatchToProps)(SettingsPage);


import {connect} from 'react-redux';
import {TimerPage} from './timer-page';

const mapStateToProps = state => {
    return {
        token: state.Authorization.token,
        taskData: state.Task.activeTask,
        settings: state.Settings.settings,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        finishTask: (token, taskId, taskData, callback) => {
            fetch(`http://localhost:3030/task/done/${taskId}`, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(taskData)
            })
                .then(res => res.json())
                .then((res) => {
                    callback();
                })
                .catch((err) => {
                    console.log(err);
                });

        },
    }
};

export const TimerPageConnector = connect(mapStateToProps, mapDispatchToProps)(TimerPage);


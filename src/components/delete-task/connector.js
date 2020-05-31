import {connect} from 'react-redux';
import {RemoveTaskModal} from './delete-task';


const mapStateToProps = state => {
    console.log(state);

    return {
        //name: state.SignUp.name
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeTask: (token, taskId, callback) => {
            fetch(`http://localhost:3030/task/${taskId}`, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
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

        }
    }
};

export const RemoveTaskModalConnector = connect(mapStateToProps, mapDispatchToProps)(RemoveTaskModal);


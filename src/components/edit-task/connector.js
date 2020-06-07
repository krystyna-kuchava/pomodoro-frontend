import {connect} from 'react-redux';
import {EditTaskModal} from './edit-task';


const mapStateToProps = state => {
    return {
        taskToEdit: state.Task.taskToEdit,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editTask: (token, taskData, callback) => {
            fetch(`http://localhost:3030/task/${taskData.taskId}`, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(taskData) // body data type must match "Content-Type" header
            })
                .then(res => res.json())
                .then((res) => {
                    dispatch({type: 'AUTHORIZATION', payload: res});
                    callback();
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }
};

export const EditTaskModalConnector = connect(mapStateToProps, mapDispatchToProps)(EditTaskModal);


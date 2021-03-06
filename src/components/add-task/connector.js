import {connect} from 'react-redux';
import {AddTaskModal} from './add-task';


const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        addTask: (token, taskData, callback) => {
            fetch(`http://localhost:3030/task`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
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

export const AddTaskModalConnector = connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);


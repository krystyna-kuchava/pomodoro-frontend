import {connect} from 'react-redux';
import {TasksListPage} from './tasks-list-page';


const mapStateToProps = state => {
    return {
        token: state.Authorization.token,
        todoTasksList: state.Task.todoTasksList,
        doneTasksList: state.Task.doneTasksList,
        globalTasksList: state.Task.globalTasksList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTodoTasksList: (token) => {
            fetch(`http://localhost:3030/tasks/list/todo-list`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then((res) => {
                    dispatch({type: 'GET_TODO_TASKS', payload: res});
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getDoneTasksList: (token) => {
            fetch(`http://localhost:3030/tasks/list/done-list`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then((res) => {
                    dispatch({type: 'GET_DONE_TASKS', payload: res});
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getGlobalTasksList: (token) => {
            fetch(`http://localhost:3030/tasks/global`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then((res) => {
                    dispatch({type: 'GET_GLOBAL_TASKS', payload: res});
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        moveTaskToTodoList: (token, taskId, callback) => {
            fetch(`http://localhost:3030/task/todo/${taskId}`, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then((res) => {
                    callback();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        startTask: (taskData, callback) => {
            dispatch({type: 'START_TASKS', payload: taskData});

            callback();
        },
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
                    dispatch({type: 'GET_SETTINGS', payload: res});
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }
};

export const TasksListPageConnector = connect(mapStateToProps, mapDispatchToProps)(TasksListPage);


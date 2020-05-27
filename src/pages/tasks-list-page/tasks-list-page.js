import React, {Component} from 'react';
import {Redirect} from 'react-router';
import routerPaths from "../../constants/router-paths";
import CATEGORIES from "../../constants/categories";
import globalListData from "../../constants/globalList";
import {Header} from "../../components/header/header";
import {Task} from "../../components/task/task";
import {AddTaskModalConnector} from "../../components/add-task";

export class TasksListPage extends Component {
    constructor() {
        super();

        this.state = {

            isToDoList: true,
            isDoneList: false,

            isAllFilter: true,
            isUrgentFilter: false,
            isHighFilter: false,
            isNormalFilter: false,
            isLowFilter: false,

            globalListData: globalListData,

            isAddTaskModalWindow: false,
            isRemoveTaskModalWindow: false,
            isEditTaskModalWindow: false,

            redirectToTimer: false
        };

        this.goToDoneList = this.goToDoneList.bind(this);
        this.goToToDoList = this.goToToDoList.bind(this);

        this.onChangeFilter = this.onChangeFilter.bind(this);

        this.moveTaskToTodoList = this.moveTaskToTodoList.bind(this);
        this.startTask = this.startTask.bind(this);

        this.onAddTaskClick = this.onAddTaskClick.bind(this);
        this.closeAddTaskModal = this.closeAddTaskModal.bind(this);
    }

    componentDidMount() {
        this.props.getTodoTasksList(localStorage.getItem('token'));
        this.props.getGlobalTasksList(localStorage.getItem('token'));
        this.props.getDoneTasksList(localStorage.getItem('token'));
        this.props.getSettings(localStorage.getItem('token'));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.globalTasksList !== this.state.globalTasksList) {
            this.setState({globalTasksList: nextProps.globalTasksList});
        }
    }

    moveTaskToTodoList(taskId) {
        console.log(taskId);

        this.props.moveTaskToTodoList(localStorage.getItem('token'), taskId, () => {
            this.props.getTodoTasksList(localStorage.getItem('token'));
            this.props.getGlobalTasksList(localStorage.getItem('token'));
        });
    }

    startTask(taskData) {
        console.log(taskData);

        this.props.startTask(taskData, () => {
            this.setState({redirectToTimer: true});
        });
    }

    goToDoneList() {
        if (this.state.isToDoList) {
            this.setState({isDoneList: true, isToDoList: false});
        }
    }

    goToToDoList() {
        if (this.state.isDoneList) {
            this.setState({isDoneList: false, isToDoList: true});
        }
    }

    onChangeFilter(priority) {

        switch (priority) {
            case 0:
                this.setState({
                    isAllFilter: true,
                    isUrgentFilter: false,
                    isHighFilter: false,
                    isNormalFilter: false,
                    isLowFilter: false,
                });
                this.filterGlobalTasks(0);
                break;
            case 1:
                this.setState({
                    isAllFilter: false,
                    isUrgentFilter: true,
                    isHighFilter: false,
                    isNormalFilter: false,
                    isLowFilter: false,
                });
                this.filterGlobalTasks(priority.toString());
                break;
            case 2:
                this.setState({
                    isAllFilter: false,
                    isUrgentFilter: false,
                    isHighFilter: true,
                    isNormalFilter: false,
                    isLowFilter: false,
                });
                this.filterGlobalTasks(priority.toString());
                break;
            case 3:
                this.setState({
                    isAllFilter: false,
                    isUrgentFilter: false,
                    isHighFilter: false,
                    isNormalFilter: true,
                    isLowFilter: false,
                });
                this.filterGlobalTasks(priority.toString());
                break;
            case 4:
                this.setState({
                    isAllFilter: false,
                    isUrgentFilter: false,
                    isHighFilter: false,
                    isNormalFilter: false,
                    isLowFilter: true,
                });
                this.filterGlobalTasks(priority.toString());
                break;
        }
    }

    filterGlobalTasks(priority) {
        if (priority === 0) {
            this.setState({globalTasksList: this.props.globalTasksList});
        } else {
            console.log(priority);

            const filteredGlobalListData = {};

            filteredGlobalListData[CATEGORIES.WORK] = this.props.globalTasksList[CATEGORIES.WORK].filter(task => task.priorityId === priority.toString());
            filteredGlobalListData[CATEGORIES.SPORT] = this.props.globalTasksList[CATEGORIES.SPORT].filter(task => task.priorityId === priority.toString());
            filteredGlobalListData[CATEGORIES.STUDYING] = this.props.globalTasksList[CATEGORIES.STUDYING].filter(task => task.priorityId === priority.toString());
            filteredGlobalListData[CATEGORIES.HOBBY] = this.props.globalTasksList[CATEGORIES.HOBBY].filter(task => task.priorityId === priority.toString());
            filteredGlobalListData[CATEGORIES.OTHER] = this.props.globalTasksList[CATEGORIES.OTHER].filter(task => task.priorityId === priority.toString());

            console.log(filteredGlobalListData);
            this.setState({globalTasksList: filteredGlobalListData});
        }
    }

    onAddTaskClick() {
        this.setState({isAddTaskModalWindow: true});
    }

    closeAddTaskModal() {
        this.setState({isAddTaskModalWindow: false});
    }

    render() {

        return (
            <>
                <Header redirectToTimer={this.state.redirectToTimer}/>
                {this.state.isAddTaskModalWindow ? (
                    <div className="modal-window-wrapper">
                        <AddTaskModalConnector closeAddTaskModal={this.closeAddTaskModal}/>
                    </div>) : (<></>)}

                <div className="page-wrapper">
                    <main className="main" id="main">
                        <div className="page-heading">
                            <h1>Tasks List</h1>
                            <a className="button-add-task icon-add" onClick={this.onAddTaskClick}/>
                        </div>
                        <div id="tasksNavigation" className="nav-task-type-wrapper">
                            <nav className="nav-tasks-type-wrapper">
                                <ul className="nav-section-types" id="navigation">
                                    <li className="navigation-item" key={'isToDoList'}>
                                        <a className={this.state.isToDoList ? 'selected-item' : ''}
                                           onClick={this.goToToDoList}>
                                            To do
                                        </a>
                                    </li>
                                    <li className="navigation-item" key={'isDoneList'}>
                                        <a className={this.state.isDoneList ? 'selected-item' : ''}
                                           onClick={this.goToDoneList}>
                                            Done
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        {
                            this.state.isToDoList ? (
                                    <>
                                        <section className="task-list-wrapper">
                                            <div className="task-list" id="taskListContainer">
                                                {this.props.todoTasksList ?
                                                    this.props.todoTasksList.map(task => {
                                                        return (<Task taskData={task} startTask={this.startTask}/>);
                                                    })
                                                    : (
                                                        <section className="no-task-already">
                                                            <div className="page-indicate"/>
                                                            <p>You don`t have any tasks left for today.</p>
                                                            <p>Add or move new tasks to stay productivity.</p>
                                                        </section>
                                                    )}
                                            </div>
                                        </section>
                                        <section className="global-list-wrapper" id="global-list-wrapper">
                                            <h2>Global list</h2>
                                            <div className="global-list-nav-wrapper" id="global-list-nav">
                                                <ul className="global-list-nav" id="category-list">
                                                    <li className="global-list-nav-item">
                                                        <a className={this.state.isAllFilter ? 'selected-item' : ''}
                                                           id="all"
                                                           onClick={this.onChangeFilter.bind(this, 0)}>All</a>
                                                    </li>
                                                    <li className="global-list-nav-item">
                                                        <a className={this.state.isUrgentFilter ? 'selected-item' : ''}
                                                           id="1"
                                                           onClick={this.onChangeFilter.bind(this, 1)}>Urgent</a>
                                                    </li>
                                                    <li className="global-list-nav-item">
                                                        <a className={this.state.isHighFilter ? 'selected-item' : ''}
                                                           id="2"
                                                           onClick={this.onChangeFilter.bind(this, 2)}>High</a>
                                                    </li>
                                                    <li className="global-list-nav-item">
                                                        <a className={this.state.isNormalFilter ? 'selected-item' : ''}
                                                           id="3"
                                                           onClick={this.onChangeFilter.bind(this, 3)}>Middle</a>
                                                    </li>
                                                    <li className="global-list-nav-item">
                                                        <a className={this.state.isLowFilter ? 'selected-item' : ''}
                                                           id="4"
                                                           onClick={this.onChangeFilter.bind(this, 4)}>Low</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <section className="global-list" id="global-list">
                                                {this.state.globalTasksList && this.state.globalTasksList[CATEGORIES.WORK].length ? (
                                                    <section className="global-list-work" id="global-list-work">
                                                        <div className="global-list-category">
                                                            <span/>
                                                            <p>WORK</p>
                                                        </div>
                                                        {this.state.globalTasksList[CATEGORIES.WORK].map(task => {
                                                            return (<Task taskData={task} onMoveTaskClick={this.moveTaskToTodoList}/>);
                                                        })}
                                                    </section>
                                                ) : (<></>)}

                                                {this.state.globalTasksList && this.state.globalTasksList[CATEGORIES.STUDYING].length ? (
                                                    <section className="global-list-education"
                                                             id="global-list-education">
                                                        <div className="global-list-category">
                                                            <span/>
                                                            <p>STUDYING</p>
                                                        </div>
                                                        {this.state.globalTasksList[CATEGORIES.STUDYING].map(task => {
                                                            return (<Task taskData={task} onMoveTaskClick={this.moveTaskToTodoList}/>);
                                                        })}
                                                    </section>
                                                ) : (<></>)}

                                                {this.state.globalTasksList && this.state.globalTasksList[CATEGORIES.HOBBY].length ? (
                                                    <section className="global-list-hobby" id="global-list-hobby">
                                                        <div className="global-list-category">
                                                            <span/>
                                                            <p>HOBBY</p>
                                                        </div>
                                                        {this.state.globalTasksList[CATEGORIES.HOBBY].map(task => {
                                                            return (<Task taskData={task} onMoveTaskClick={this.moveTaskToTodoList}/>);
                                                        })}
                                                    </section>
                                                ) : (<></>)}

                                                {this.state.globalTasksList && this.state.globalTasksList[CATEGORIES.SPORT].length ? (
                                                    <section className="global-list-sport" id="global-list-sport">
                                                        <div className="global-list-category">
                                                            <span/>
                                                            <p>SPORT</p>
                                                        </div>
                                                        {this.state.globalTasksList[CATEGORIES.SPORT].map(task => {
                                                            return (<Task taskData={task} onMoveTaskClick={this.moveTaskToTodoList}/>);
                                                        })}
                                                    </section>
                                                ) : (<></>)}

                                                {this.state.globalTasksList && this.state.globalTasksList[CATEGORIES.OTHER].length ? (
                                                    <section className="global-list-others" id="global-list-others">
                                                        <div className="global-list-category">
                                                            <span/>
                                                            <p>OTHER</p>
                                                        </div>
                                                        {this.state.globalTasksList[CATEGORIES.OTHER].map(task => {
                                                            return (<Task taskData={task} onMoveTaskClick={this.moveTaskToTodoList}/>);
                                                        })}
                                                    </section>
                                                ) : (<></>)}

                                            </section>
                                        </section>
                                    </>
                                )

                                :

                                (
                                    <>
                                        {this.props.doneTasksList ?
                                            this.props.doneTasksList.map(task => {
                                                return (<Task taskData={task}/>);
                                            })
                                            : (
                                                <> </>
                                            )}
                                    </>
                                )
                        }

                    </main>
                </div>
            </>
        );
    }
}

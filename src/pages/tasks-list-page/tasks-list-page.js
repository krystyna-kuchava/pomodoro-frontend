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
        };

        this.goToDoneList = this.goToDoneList.bind(this);
        this.goToToDoList = this.goToToDoList.bind(this);

        this.onChangeFilter = this.onChangeFilter.bind(this);


        this.onAddTaskClick = this.onAddTaskClick.bind(this);
        this.closeAddTaskModal = this.closeAddTaskModal.bind(this);
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
            this.setState({globalListData: globalListData});
        } else {
            const filteredGlobalListData = {};

            filteredGlobalListData[CATEGORIES.WORK] = globalListData[CATEGORIES.WORK].filter(task => task.priorityId === priority);
            filteredGlobalListData[CATEGORIES.SPORT] = globalListData[CATEGORIES.SPORT].filter(task => task.priorityId === priority);
            filteredGlobalListData[CATEGORIES.STUDYING] = globalListData[CATEGORIES.STUDYING].filter(task => task.priorityId === priority);
            filteredGlobalListData[CATEGORIES.HOBBY] = globalListData[CATEGORIES.HOBBY].filter(task => task.priorityId === priority);
            filteredGlobalListData[CATEGORIES.OTHER] = globalListData[CATEGORIES.OTHER].filter(task => task.priorityId === priority);

            this.setState({globalListData: filteredGlobalListData});
        }
    }

    onAddTaskClick() {
        this.setState({isAddTaskModalWindow: true});
    }

    closeAddTaskModal() {
        this.setState({isAddTaskModalWindow: false});
    }

    render() {
        const todoTaskList = [{
            title: 'Task 110',
            description: 'Task 110',
            categoryId: '1',
            priorityId: '1',
            estimation: '2',
            deadlineDate: '19-05-2020',
            status: 'DONE_LIST',
            taskId: 233
        },
            {
                title: 'Task 110',
                description: 'Task 110',
                categoryId: '2',
                priorityId: '4',
                estimation: '3',
                deadlineDate: '19-05-2020',
                status: 'TODO_LIST',
                taskId: 236
            },
            {
                title: 'Task 110',
                description: 'Task 110',
                categoryId: '3',
                priorityId: '2',
                estimation: '5',
                deadlineDate: '19-05-2020',
                status: 'TODO_LIST',
                taskId: 23366
            },
            {
                title: 'Task 110',
                description: 'Task 110',
                categoryId: '3',
                priorityId: '3',
                estimation: '4',
                deadlineDate: '19-05-2020',
                status: 'GLOBAL_LIST',
                taskId: 23323
            },
            {
                title: 'Task 110',
                description: 'Task 110',
                categoryId: '3',
                priorityId: '4',
                estimation: '2',
                deadlineDate: '19-05-2020',
                status: 'GLOBAL_LIST',
                taskId: 3323
            }];

        return (
            <>
                <Header/>
                {this.state.isAddTaskModalWindow ? (
                    <div className="modal-window-wrapper">
                        <AddTaskModalConnector closeAddTaskModal={this.closeAddTaskModal}/>
                    </div>) : (<></>)}

                <div className="page-wrapper">
                    <main className="main" id="main">
                        <div className="page-heading">
                            <h1>Daily Tasks List</h1>
                            <a className="button-add-task icon-add" onClick={this.onAddTaskClick}/>
                        </div>
                        <div id="tasksNavigation" className="nav-task-type-wrapper">
                            <nav className="nav-tasks-type-wrapper">
                                <ul className="nav-section-types" id="navigation">
                                    <li className="navigation-item">
                                        <a className={this.state.isToDoList ? 'selected-item' : ''}
                                           onClick={this.goToToDoList}>
                                            To do
                                        </a>
                                    </li>
                                    <li className="navigation-item">
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
                                                {todoTaskList.length === 0 ? (
                                                    <section className="no-task-already">
                                                        <div className="page-indicate"/>
                                                        <p>You don`t have any tasks left for today.</p>
                                                        <p>Add new tasks to stay productivity.
                                                        </p>
                                                    </section>
                                                ) : (<></>)}

                                                {todoTaskList.map(task => {
                                                    return (<Task taskData={task}/>);
                                                })}
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
                                                {this.state.globalListData[CATEGORIES.WORK].length ? (
                                                    <section className="global-list-work" id="global-list-work">
                                                        <div className="global-list-category">
                                                            <span/>
                                                            <p>WORK</p>
                                                        </div>
                                                        {this.state.globalListData[CATEGORIES.WORK].map(task => {
                                                            return (<Task taskData={task}/>);
                                                        })}
                                                    </section>
                                                ) : (<></>)}

                                                {this.state.globalListData[CATEGORIES.STUDYING].length ? (
                                                    <section className="global-list-education"
                                                             id="global-list-education">
                                                        <div className="global-list-category">
                                                            <span/>
                                                            <p>STUDYING</p>
                                                        </div>
                                                        {this.state.globalListData[CATEGORIES.STUDYING].map(task => {
                                                            return (<Task taskData={task}/>);
                                                        })}
                                                    </section>
                                                ) : (<></>)}

                                                {this.state.globalListData[CATEGORIES.HOBBY].length ? (
                                                    <section className="global-list-hobby" id="global-list-hobby">
                                                        <div className="global-list-category">
                                                            <span/>
                                                            <p>HOBBY</p>
                                                        </div>
                                                        {this.state.globalListData[CATEGORIES.HOBBY].map(task => {
                                                            return (<Task taskData={task}/>);
                                                        })}
                                                    </section>
                                                ) : (<></>)}

                                                {this.state.globalListData[CATEGORIES.SPORT].length ? (
                                                    <section className="global-list-sport" id="global-list-sport">
                                                        <div className="global-list-category">
                                                            <span/>
                                                            <p>SPORT</p>
                                                        </div>
                                                        {this.state.globalListData[CATEGORIES.SPORT].map(task => {
                                                            return (<Task taskData={task}/>);
                                                        })}
                                                    </section>
                                                ) : (<></>)}

                                                {this.state.globalListData[CATEGORIES.OTHER].length ? (
                                                    <section className="global-list-others" id="global-list-others">
                                                        <div className="global-list-category">
                                                            <span/>
                                                            <p>OTHER</p>
                                                        </div>
                                                        {this.state.globalListData[CATEGORIES.OTHER].map(task => {
                                                            return (<Task taskData={task}/>);
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
                                        {todoTaskList.map(task => {
                                            return (<Task taskData={task}/>);
                                        })}
                                    </>
                                )
                        }

                    </main>
                </div>
            </>
        );
    }
}

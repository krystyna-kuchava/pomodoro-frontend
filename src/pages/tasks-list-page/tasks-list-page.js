import React, {Component} from 'react';
import {Redirect} from 'react-router';
import routerPaths from "../../constants/router-paths";
import {Header} from "../../components/header/header";
import {Task} from "../../components/task/task";

export class TasksListPage extends Component {
    constructor() {
        super();

        this.state = {
            redirectToSettings: false,
            redirectToReports: false,

            isToDoList: true,
            isDoneList: false,

            isAllFilter: true,
            isUrgentFilter: false,
            isHighFilter: false,
            isNormalFilter: false,
            isLowFilter: false,
        };

        this.goToDoneList = this.goToDoneList.bind(this);
        this.goToToDoList = this.goToToDoList.bind(this);

        this.onChangeFilter = this.onChangeFilter.bind(this);


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
                break;
            case 1:
                this.setState({
                    isAllFilter: false,
                    isUrgentFilter: true,
                    isHighFilter: false,
                    isNormalFilter: false,
                    isLowFilter: false,
                });
                break;
            case 2:
                this.setState({
                    isAllFilter: false,
                    isUrgentFilter: false,
                    isHighFilter: true,
                    isNormalFilter: false,
                    isLowFilter: false,
                });
                break;
            case 3:
                this.setState({
                    isAllFilter: false,
                    isUrgentFilter: false,
                    isHighFilter: false,
                    isNormalFilter: true,
                    isLowFilter: false,
                });
                break;
            case 4:
                this.setState({
                    isAllFilter: false,
                    isUrgentFilter: false,
                    isHighFilter: false,
                    isNormalFilter: false,
                    isLowFilter: true,
                });
                break;
        }
    }

    render() {
        const taskList = [{
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
                <div className="page-wrapper">
                    <main className="main" id="main">
                        <div className="page-heading">
                            <h1>Daily Tasks List</h1>
                            <a className="button-add-task icon-add" id="addTaskButton"/>
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
                                                {/*<section className="task-added">
                                    <p>Task added,<br>drag it to the top 5 in daily task list</p>
                                    <i className="drag-to-top icon-arrow_circle"></i>
                                </section>*/}

                                                {taskList.map(task => {
                                                    return (<Task  taskData={task}/>);
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
                                            {/*<section className="global-list" id="global-list">
                                <section className="global-list-work" id="global-list-work">
                                    <div className="global-list-category" style="display: flex;">
                                        <span></span>
                                        <p>WORK</p>
                                    </div>
                                    <section className="task " taskid="id1589710353514">
                                        <div className="task-content categories-work">
                                            <div className="task-delete-button-wrapper">
                                                <div className="task-delete-button">
                                                    <span className="icon-trash"></span>
                                                    <button className="select-for-deleting icon-close"
                                                            taskid="id1589710353514" id="taskButtonDelete">
                                                        <!--<span class=""></span>-->
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="task-term">
                                                <span>05/23/2020 </span>
                                            </div>
                                            <div className="task-description priority-highP">
                                                <h2 className="task-title">dcdc</h2>
                                                <p className="task-text">gbhjklkjhvjkljh</p>
                                            </div>
                                            <div className="task-edit">
                                                <button className="icon-arrows-up" taskid="id1589710353514"></button>
                                                <button className="icon-edit" taskid="id1589710353514"
                                                        title="Edit task"></button>
                                            </div>
                                            <div className="task-priority">
                                                <span className="icon-tomato"></span>
                                                <p>3</p>
                                                <div className="task-start">
                                                    <span className="icon-timer"></span>
                                                    <a href="/timer" className="timer-link" id="linkToTimer"
                                                       taskid="id1589710353514" title="Go to Timer"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </section>
                                <section className="global-list-education" id="global-list-education">
                                    <div className="global-list-category">
                                        <span></span>
                                        <p>EDUCATION</p>
                                    </div>
                                </section>
                                <section className="global-list-hobby" id="global-list-hobby">
                                    <div className="global-list-category">
                                        <span></span>
                                        <p>HOBBY</p>
                                    </div>
                                </section>
                                <section className="global-list-sport" id="global-list-sport">
                                    <div className="global-list-category" style="display: flex;">
                                        <span></span>
                                        <p>SPORT</p>
                                    </div>
                                    <section className="task " taskid="id1589711581078">
                                        <div className="task-content categories-sport">
                                            <div className="task-delete-button-wrapper">
                                                <div className="task-delete-button">
                                                    <span className="icon-trash"></span>
                                                    <button className="select-for-deleting icon-close"
                                                            taskid="id1589711581078" id="taskButtonDelete">
                                                        <!--<span class=""></span>-->
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="task-term">
                                                <span>05/27/2020 </span>
                                            </div>
                                            <div className="task-description priority-lowP">
                                                <h2 className="task-title">dfdfdf</h2>
                                                <p className="task-text">dfdfdfdf</p>
                                            </div>
                                            <div className="task-edit">
                                                <button className="icon-arrows-up" taskid="id1589711581078"></button>
                                                <button className="icon-edit" taskid="id1589711581078"
                                                        title="Edit task"></button>
                                            </div>
                                            <div className="task-priority">
                                                <span className="icon-tomato"></span>
                                                <p>4</p>
                                                <div className="task-start">
                                                    <span className="icon-timer"></span>
                                                    <a href="/timer" className="timer-link" id="linkToTimer"
                                                       taskid="id1589711581078" title="Go to Timer"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </section>
                                <section className="global-list-others" id="global-list-others">
                                    <div className="global-list-category">
                                        <span></span>
                                        <p>OTHER</p>
                                    </div>
                                </section>
                            </section>*/}
                                        </section>
                                    </>
                                )


                                :


                                (
                                    <>
                                    </>
                                )
                        }

                    </main>
                </div>
            </>
        );
    }
}

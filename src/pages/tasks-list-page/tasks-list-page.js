import React, {Component} from 'react';
import {Redirect} from 'react-router';
import routerPaths from "../../constants/router-paths";
import {Header} from "../../components/header/header";

export class TasksListPage extends Component {
    constructor() {
        super();

        this.state = {
            redirectToSettings: false,
            redirectToReports: false
        };

        //this.onSignUpClick = this.onSignUpClick.bind(this);
    }

    render() {
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
                            {/*<nav className="nav-tasks-type-wrapper">
                                <ul className="nav-section-types" id="navigation">
                                    <li className="navigation-item"><a href="/taskList/toDo" id="toDo"
                                                                       className="selected-item">To do</a></li>
                                    <li className="navigation-item"><a href="/taskList/done" id="done">Done</a></li>
                                </ul>
                            </nav>*/}
                        </div>
                        <section className="task-list-wrapper">
                            <div className="task-list" id="taskListContainer">
                                {/*<section className="task-added">
                                    <p>Task added,<br>drag it to the top 5 in daily task list</p>
                                    <i className="drag-to-top icon-arrow_circle"></i>
                                </section>*/}


                            </div>
                        </section>
                        <section className="global-list-wrapper" id="global-list-wrapper">
                            {/*<div className="link-to-global">
                                <a id="showHideGlobalList" title="Go to Global list">Global list <span
                                    className="icon-global-list-arrow-down"></span></a>
                            </div>*/}
                            {/*<div className="global-list-nav-wrapper" id="global-list-nav">
                                <ul className="global-list-nav" id="category-list">
                                    <li className="global-list-nav-item selected-list-item"><a id="all">All</a></li>
                                    <li className="global-list-nav-item"><a id="0">Urgent</a></li>
                                    <li className="global-list-nav-item"><a id="1">High</a></li>
                                    <li className="global-list-nav-item"><a id="2">Middle</a></li>
                                    <li className="global-list-nav-item"><a id="3">Low</a></li>
                                </ul>
                            </div>*/}
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
                    </main>
                </div>
            </>
    );
    }
    }

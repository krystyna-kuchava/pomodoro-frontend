import React, {Component} from 'react';
import {Redirect} from 'react-router';
import routerPaths from "../../constants/router-paths";
import {Header} from "../../components/header/header";

export class Task extends Component {
    constructor() {
        super();

        this.state = {
            redirectToTimer: false
        };

        //this.onSignUpClick = this.onSignUpClick.bind(this);
    }

    setCategoryClass(categoryId) {
        switch (categoryId) {
            case '1':
                return 'categories-work';
            case '2':
                return 'categories-sport';
            case '3':
                return 'categories-education';
            case '4':
                return 'categories-hobby';
            case '5':
                return 'categories-others';
        }
    }

    setPriorityClass(priorityId) {
        switch (priorityId) {
            case '1':
                return 'priority-urgentP';
            case '2':
                return 'priority-highP';
            case '3':
                return 'priority-middleP';
            case '4':
                return 'priority-lowP';
        }
    }

    render() {
        const taskData = this.props.taskData;

        const categoryClass = this.setCategoryClass(taskData.categoryId);
        const priorityClass = this.setPriorityClass(taskData.priorityId);


        return (
            <div className={taskData.status === 'DONE_LIST' ? 'task task-done' : 'task'} data-task-id={taskData.taskId}>
                <div className={`task-content ${categoryClass}`}>
                    <div className="task-delete-button-wrapper">
                        {/*<div className="task-delete-button">
                            <span className="icon-trash"/>
                            <button className="select-for-deleting icon-close" data-task-id={taskData.taskId}
                                    id="taskButtonDelete">
                            </button>
                        </div>*/}
                    </div>
                    <div className="task-term">
                        <span>{taskData.completeDay ? taskData.completeDay : taskData.deadlineDate}</span>
                    </div>
                    <div className={`task-description ${priorityClass}`}>
                        <h2 className="task-title">{taskData.title}</h2>
                        <p className="task-text">{taskData.description}</p>
                    </div>
                    <div className="task-edit">
                        {taskData.status === 'GLOBAL_LIST' ? (
                            <>
                                <button className="icon-arrows-up" data-task-id={taskData.taskId}/>
                                <button className="icon-edit" data-task-id={taskData.taskId} title="Edit task"/>
                                <button className="icon-trash" data-task-id={taskData.taskId}/>
                            </>
                        ) : (
                            taskData.status === 'TODO_LIST' ? (
                                <>
                                <button className="icon-edit" data-task-id={taskData.taskId} title="Edit task"/>
                                < button className = "icon-trash" data-task-id={taskData.taskId}/>
                                </>
                            ) : (
                            <button className="icon-trash" data-task-id={taskData.taskId}/>
                            )
                            )}
                    </div>
                    <div className="task-priority">
                        <span className="icon-tomato"/>
                        <p>{taskData.estimation}</p>
                        <div className="task-start">
                            <span className="icon-timer"/>
                            <a href="/timer" className="timer-link" id="linkToTimer" data-task-id={taskData.taskId}
                               title="Go to Timer"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

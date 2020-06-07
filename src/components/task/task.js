import React, {Component} from 'react';

export class Task extends Component {
    constructor() {
        super();

        this.state = {
            redirectToTimer: false
        };

        this.onMoveTaskClick = this.onMoveTaskClick.bind(this);
        this.onStartTaskClick = this.onStartTaskClick.bind(this);
        this.onRemoveTaskClick = this.onRemoveTaskClick.bind(this);
        this.onEditTaskClick = this.onEditTaskClick.bind(this);
    }

    onMoveTaskClick(taskId) {
        this.props.onMoveTaskClick(taskId);
    }

    onStartTaskClick(taskData) {
        this.props.startTask(taskData);
    }

    onRemoveTaskClick(taskId) {
        this.props.removeTask(taskId);
    }

    onEditTaskClick(taskData) {
        this.props.editTask(taskData);
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
            <div
                className={(taskData.status === 'DONE_LIST' || taskData.status === 'FAILED') ? 'task task-done' : 'task'}
                key={taskData.taskId}>
                <div className={`task-content ${categoryClass}`}>
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
                                <button className="icon-arrows-up" data-task-id={taskData.taskId} onClick={this.onMoveTaskClick.bind(this, taskData.taskId)}/>
                                <button className="icon-edit" data-task-id={taskData.taskId} title="Edit task" onClick={this.onEditTaskClick.bind(this, taskData)}/>
                                <button className="icon-trash" data-task-id={taskData.taskId} onClick={this.onRemoveTaskClick.bind(this, taskData.taskId)}/>
                            </>
                        ) : (
                            taskData.status === 'TODO_LIST' ? (
                                <>
                                    <button className="icon-edit" data-task-id={taskData.taskId} title="Edit task" onClick={this.onEditTaskClick.bind(this, taskData)}/>
                                    <button className="icon-trash" data-task-id={taskData.taskId} onClick={this.onRemoveTaskClick.bind(this, taskData.taskId)}/>
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
                            <a className="timer-link" id="linkToTimer" data-task-id={taskData.taskId}
                               title="Go to Timer" onClick={this.onStartTaskClick.bind(this, taskData)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

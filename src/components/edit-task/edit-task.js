import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {convertToDate} from '../../constants/convertDate';
import generateHint from '../../constants/hint-generator';
import CATEGORIES from '../../constants/categories';

import {validateTitle} from '../../validation/task/task-validation';
import {validateDescription} from '../../validation/task/task-validation';

export class EditTaskModal extends Component {

    constructor() {
        super();

        this.state = {

            shouldDisplayHint: false,
            hint: '',

            isTitleError: false,
            isDescriptionError: false,
            isCategoryError: false,
            isPriorityError: false,
            isEstimationError: false,
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSHowHint = this.handleSHowHint.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onEditTaskClick = this.onEditTaskClick.bind(this);


        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onEstimationChange = this.onEstimationChange.bind(this);
        this.onPriorityChange = this.onPriorityChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            title: this.props.taskData.title,
            description: this.props.taskData.description,
            categoryId: this.props.taskData.categoryId,
            priorityId: this.props.taskData.priorityId,
            estimation: this.props.taskData.estimation,
            deadlineDate: this.props.taskData.deadlineDate,
            taskId: this.props.taskData.taskId
        });
    }

    handleSHowHint(priorityId) {
        generateHint(localStorage.getItem('token'), priorityId, (shouldDisplayHint) => {
            if (shouldDisplayHint.shouldDisplayHint) {
                this.setState({
                    shouldDisplayHint: shouldDisplayHint.shouldDisplayHint,
                    hint: `You have ${shouldDisplayHint.percentOfPriorityFailedTasks}% of failed tasks of this priority.
                     And you have ${shouldDisplayHint.percentOfFailedTasks}% of failed tasks in total.
                     Please choose higher estimation.`
                });
            } else {
                this.setState({
                    shouldDisplayHint: false,
                    hint: ``
                });
            }
        })
    }

    handleDateChange(date) {
        this.setState({
            deadlineDate: convertToDate(date)
        });
    }

    onTitleChange(e) {
        const {target: {value}} = e;
        this.setState({title: value});

        if (!validateTitle(value)) {
            this.setState({isTitleError: true});
        } else {
            this.setState({isTitleError: false});
        }
    }

    onDescriptionChange(e) {
        const {target: {value}} = e;
        this.setState({description: value});

        if (!validateDescription(value)) {
            this.setState({isDescriptionError: true});
        } else {
            this.setState({isDescriptionError: false});
        }
    }

    onCategoryChange(categoryId) {
        this.setState({isCategoryError: false, categoryId: categoryId});
    }

    onEstimationChange(estimation) {
        this.setState({isEstimationError: false, estimation: estimation});
    }

    onPriorityChange(priorityId) {
        this.setState({isPriorityError: false, priorityId: priorityId});

        this.handleSHowHint(priorityId);
    }

    onCloseClick() {
        this.props.closeEditTaskModal();
    }

    onEditTaskClick() {
        if (!this.state.isTitleError &&
            !this.state.isDescriptionError &&
            !this.state.isCategoryError &&
            !this.state.isEstimationError &&
            !this.state.isPriorityError) {
            const taskData = {
                title: this.state.title,
                description: this.state.description,
                categoryId: this.state.categoryId,
                priorityId: this.state.priorityId,
                estimation: this.state.estimation,
                deadlineDate: this.state.deadlineDate,
                taskId: this.state.taskId
            };

            this.props.editTask(localStorage.getItem('token'), taskData, () => {
                this.props.editTaskCallback(localStorage.getItem('token'));
            });

            this.props.closeEditTaskModal();
        }
    }

    render() {
        return (
            <div className="modal-window">
                <div className="modal-heading">
                    <div className="modal-header-buttons clearfix">
                        <button className="modal-ok-close icon-check" id="addTask" onClick={this.onEditTaskClick}/>
                        <button className="modal-ok-close icon-close" id="closeWindow" onClick={this.onCloseClick}/>
                    </div>
                    <div className="modal-title">
                        <span>Add Task</span>
                    </div>
                </div>
                <div className="modal-window-content ">

                    <ul>
                        <li className="modal-add-item">
                            <p>Title</p>
                            <input type="text"
                                   placeholder="Add title here"
                                   id="title"
                                   value={this.state.title}
                                   onChange={this.onTitleChange}/>
                            {this.state.isTitleError ? (
                                <p className="error-message">Should not be empty</p>
                            ) : (<></>)}
                        </li>
                        <li className="modal-add-item">
                            <p>Description</p>
                            <input type="text"
                                   placeholder="Add description here"
                                   id="description"
                                   value={this.state.description}
                                   onChange={this.onDescriptionChange}/>
                            {this.state.isDescriptionError ? (
                                <p className="error-message">Should not be empty</p>
                            ) : (<></>)}
                        </li>
                        <li className="modal-add-item">
                            <p>Category</p>
                            <form className="modal-add-type modal-add-category" id="category">
                                <label className="categories-work">
                                    <input type="radio" name="Category"
                                           checked={this.state.categoryId === CATEGORIES.WORK}
                                           onChange={this.onCategoryChange.bind(this, CATEGORIES.WORK)}/>
                                    <span className="type-dot"/>
                                    <span>Work</span>
                                </label>
                                <label className="categories-education">
                                    <input type="radio" name="Category"
                                           checked={this.state.categoryId === CATEGORIES.STUDYING}
                                           onChange={this.onCategoryChange.bind(this, CATEGORIES.STUDYING)}/>
                                    <span className="type-dot"/>
                                    <span>Studying</span>
                                </label>
                                <label className="categories-hobby">
                                    <input type="radio" name="Category"
                                           checked={this.state.categoryId === CATEGORIES.HOBBY}
                                           onChange={this.onCategoryChange.bind(this, CATEGORIES.HOBBY)}/>
                                    <span className="type-dot"/>
                                    <span>Hobby</span>
                                </label>
                                <label className="categories-sport">
                                    <input type="radio" name="Category"
                                           checked={this.state.categoryId === CATEGORIES.SPORT}
                                           onChange={this.onCategoryChange.bind(this, CATEGORIES.SPORT)}/>
                                    <span className="type-dot"/>
                                    <span>Sport</span>
                                </label>
                                <label className="categories-others">
                                    <input type="radio" name="Category"
                                           checked={this.state.categoryId === CATEGORIES.OTHER}
                                           onChange={this.onCategoryChange.bind(this, CATEGORIES.OTHER)}/>
                                    <span className="type-dot"/>
                                    <span>Other</span>
                                </label>
                            </form>
                            {this.state.isCategoryError ? (
                                <p className="error-message">Should not be chosen one</p>
                            ) : (<></>)}
                        </li>
                        <li className="modal-add-item">
                            <p>Deadline</p>
                            <DatePicker onChange={this.handleDateChange}/>
                            <input type="text" placeholder="August 10, 2018" id="deadline" className="hasDatepicker"
                                   value={this.state.deadlineDate}/>
                        </li>
                        <li className="modal-add-item">
                            <p>Estimation</p>
                            <form className="rating modal-add-estimation" id="estimation">
                                <input type="radio" id="star5" name="rating" value="5"
                                       checked={this.state.estimation === '5'}
                                       onChange={this.onEstimationChange.bind(this, '5')}/>
                                <label className="full" htmlFor="star5"/>
                                <input type="radio" id="star4" name="rating" value="4"
                                       checked={this.state.estimation === '4'}
                                       onChange={this.onEstimationChange.bind(this, '4')}/>
                                <label className="full" htmlFor="star4"/>
                                <input type="radio" id="star3" name="rating" value="3"
                                       checked={this.state.estimation === '3'}
                                       onChange={this.onEstimationChange.bind(this, '3')}/>
                                <label className="full" htmlFor="star3"/>
                                <input type="radio" id="star2" name="rating" value="2"
                                       checked={this.state.estimation === '2'}
                                       onChange={this.onEstimationChange.bind(this, '2')}/>
                                <label className="full" htmlFor="star2"/>
                                <input type="radio" id="star1" name="rating" value="1"
                                       checked={this.state.estimation === '1'}
                                       onChange={this.onEstimationChange.bind(this, '1')}/>
                                <label className="full" htmlFor="star1"/>
                            </form>
                            {this.state.isEstimationError ? (
                                <p className="error-message">Should not be chosen</p>
                            ) : (<></>)}
                        </li>
                        <li className="modal-add-item">
                            <p>Priority</p>
                            <form className="modal-add-type modal-add-priority" id="priority">
                                <label className="priority-urgentP">
                                    <input type="radio" name="Priority"
                                           checked={this.state.priorityId === '1'}
                                           onClick={this.onPriorityChange.bind(this, '1')}/>
                                    <span className="type-dot"/>
                                    <span>Urgent</span>
                                </label>
                                <label className="priority-highP">
                                    <input type="radio" name="Priority"
                                           checked={this.state.priorityId === '2'}
                                           onClick={this.onPriorityChange.bind(this, '2')}/>
                                    <span className="type-dot"/>
                                    <span>High</span>
                                </label>
                                <label className="priority-middleP">
                                    <input type="radio" name="Priority"
                                           checked={this.state.priorityId === '3'}
                                           onClick={this.onPriorityChange.bind(this, '3')}/>
                                    <span className="type-dot"/>
                                    <span>Middle</span>
                                </label>
                                <label className="priority-lowP">
                                    <input type="radio" name="Priority"
                                           checked={this.state.priorityId === '4'}
                                           onClick={this.onPriorityChange.bind(this, '4')}/>
                                    <span className="type-dot"/>
                                    <span>Low</span>
                                </label>
                            </form>
                            {this.state.isPriorityError ? (
                                <p className="error-message">Should not be chosen one</p>
                            ) : (<></>)}
                            {this.state.shouldDisplayHint ? (<p className="modal-hint">{this.state.hint}</p>) : (<></>)}
                        </li>
                    </ul>
                </div>
                <div className="remove-finishing">
                </div>
            </div>
        );
    }
}

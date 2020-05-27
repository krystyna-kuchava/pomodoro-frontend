import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {convertToDate} from '../../constants/convertDate';
import generateHint from '../../constants/hint-generator';

export class AddTaskModal extends Component {

    constructor() {
        super();

        this.state = {
            title: '',
            description: '',
            categoryId: '',
            priorityId: '',
            estimation: '',
            deadlineDate: '20-05-2020',
            shouldDisplayHint: false,
            hint: ''
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSHowHint = this.handleSHowHint.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
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
        console.log(convertToDate(date));

        this.setState({
            deadlineDate: convertToDate(date)
        });
    }

    onCloseClick() {
        this.props.closeAddTaskModal();
    }

    render() {

        return (
            <div className="modal-window">
                <div className="modal-heading">
                    <div className="modal-header-buttons clearfix">
                        <button className="modal-ok-close icon-check" id="addTask"/>
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
                            <input type="text" placeholder="Add title here" id="title"/>
                        </li>
                        <li className="modal-add-item">
                            <p>Description</p>
                            <input type="text" placeholder="Add description here" id="description"/>
                        </li>
                        <li className="modal-add-item">
                            <p>Category</p>
                            <form className="modal-add-type modal-add-category" id="category">
                                <label className="categories-work">
                                    <input type="radio" name="Category"/>
                                    <span className="type-dot"/>
                                    <span>Work</span>
                                </label>
                                <label className="categories-education">
                                    <input type="radio" name="Category"/>
                                    <span className="type-dot"/>
                                    <span>Education</span>
                                </label>
                                <label className="categories-hobby">
                                    <input type="radio" name="Category"/>
                                    <span className="type-dot"/>
                                    <span>Hobby</span>
                                </label>
                                <label className="categories-sport">
                                    <input type="radio" name="Category"/>
                                    <span className="type-dot"/>
                                    <span>Sport</span>
                                </label>
                                <label className="categories-others">
                                    <input type="radio" name="Category"/>
                                    <span className="type-dot"/>
                                    <span>Other</span>
                                </label>
                            </form>
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
                                <input type="radio" id="star5" name="rating" value="5"/>
                                <label className="full" htmlFor="star5"/>
                                <input type="radio" id="star4" name="rating" value="4"/>
                                <label className="full" htmlFor="star4"/>
                                <input type="radio" id="star3" name="rating" value="3"/>
                                <label className="full" htmlFor="star3"/>
                                <input type="radio" id="star2" name="rating" value="2"/>
                                <label className="full" htmlFor="star2"/>
                                <input type="radio" id="star1" name="rating" value="1"/>
                                <label className="full" htmlFor="star1"/>
                            </form>
                        </li>
                        <li className="modal-add-item">
                            <p>Priority</p>
                            <form className="modal-add-type modal-add-priority" id="priority">
                                <label className="priority-urgentP">
                                    <input type="radio" name="Priority"
                                           onClick={this.handleSHowHint.bind(this, '1')}/>
                                    <span className="type-dot"/>
                                    <span>Urgent</span>
                                </label>
                                <label className="priority-highP">
                                    <input type="radio" name="Priority"
                                           onClick={this.handleSHowHint.bind(this, '2')}/>
                                    <span className="type-dot"/>
                                    <span>High</span>
                                </label>
                                <label className="priority-middleP">
                                    <input type="radio" name="Priority"
                                           onClick={this.handleSHowHint.bind(this, '3')}/>
                                    <span className="type-dot"/>
                                    <span>Middle</span>
                                </label>
                                <label className="priority-lowP">
                                    <input type="radio" name="Priority"
                                           onClick={this.handleSHowHint.bind(this, '4')}/>
                                    <span className="type-dot"/>
                                    <span>Low</span>
                                </label>
                            </form>
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

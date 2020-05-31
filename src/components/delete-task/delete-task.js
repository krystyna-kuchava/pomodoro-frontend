import React, {Component} from 'react';

export class RemoveTaskModal extends Component {

    constructor() {
        super();

        this.state = {

        };

        this.onCloseClick = this.onCloseClick.bind(this);
        this.onRemoveTaskClick = this.onRemoveTaskClick.bind(this);

    }


    onCloseClick() {
        this.props.closeRemoveTaskModal();
    }

    onRemoveTaskClick() {
        this.props.removeTask(
            localStorage.getItem('token'),
            this.props.taskId,
            () => {
                this.props.removeTaskCallback();
            }
        );

        this.props.closeRemoveTaskModal();
    }

    render() {

        return (
            <div className="modal-window">
                <div className="modal-heading">
                    <div className="modal-header-buttons clearfix">
                        <button className="modal-ok-close icon-close" id="closeWindow" onClick={this.onCloseClick}/>
                    </div>
                    <div className="modal-title">
                        <span>Remove Task</span>
                    </div>
                </div>
                <div className="modal-window-content modal-window-remove">
                    <p>Are you sure you want to remove selected task?</p>
                </div>
                <div className="remove-finishing">
                    <button className="button-ok" onClick={this.onCloseClick}>Cancel</button>
                    <button className="button-cancel" onClick={this.onRemoveTaskClick}>Remove</button>
                </div>
            </div>
        );
    }
}

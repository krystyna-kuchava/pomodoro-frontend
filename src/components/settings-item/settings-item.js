import React, {Component} from 'react';

export class SettingsItem extends Component {

    constructor() {
        super();

        this.state = {};

        this.onDecreaseValueClick = this.onDecreaseValueClick.bind(this);
        this.onIncreaseValueClick = this.onIncreaseValueClick.bind(this);
    }

    onDecreaseValueClick(e) {
        e.preventDefault();

        /*const shortBreak = document.getElementById('shortBreak').value;
        const workTime = document.getElementById('workTime').value;

        this.props.login({shortBreak, workTime}, () => {
            this.setState({redirect: true});
        });*/
    };

    onIncreaseValueClick(e) {
        e.preventDefault();

        /*const shortBreak = document.getElementById('shortBreak').value;
        const workTime = document.getElementById('workTime').value;

        this.props.login({shortBreak, workTime}, () => {
            this.setState({redirect: true});
        });*/
    };

    render() {

        return (
            <div className={`pomodoro-criterion ${this.props.settingsItem.settingsType}`} id={this.props.settingsItem.settingsType}>
                <label className="paragraph">{this.props.settingsItem.settingsTitle}</label>
                <div className="iteration-count">
                    <button className="iteration-decrease" onClick={this.onDecreaseValueClick}>-</button>
                    <input type="text" value={this.props.settingsItem.settingsValue} disabled/>
                    <button className="iteration-increase" onClick={this.onIncreaseValueClick}>+</button>
                </div>
                <p>Please select a value between {this.props.settingsItem.settingsRule}
                    <span className="measure">{this.props.settingsItem.settingsMeasure}</span>
                </p>
            </div>
        );
    }
}

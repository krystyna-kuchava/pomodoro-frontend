import React, {Component} from 'react';

export class SettingsItem extends Component {

    constructor() {
        super();

        this.state = {};

        this.onIncreaseValue = this.onIncreaseValue.bind(this);
        this.onDecreaseValue = this.onDecreaseValue.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.settingsItem !== this.state.settingsItem) {
            this.setState({settingsItem: nextProps.settingsItem});
        }
    }

    onDecreaseValue(inputId) {
        if (parseInt(document.getElementById(inputId).value) > 1) {
            this.setState({
                settingsItem: {
                    ...this.state.settingsItem,
                    settingsValue: parseInt(document.getElementById(inputId).value) - 1
                }
            });
        }
    }

    onIncreaseValue(inputId) {
        this.setState({
            settingsItem: {
                ...this.state.settingsItem,
                settingsValue: parseInt(document.getElementById(inputId).value) + 1
            }
        });
    }

    render() {

        return (
            <>
                {this.state.settingsItem ? (
                    <div className={`pomodoro-criterion ${this.state.settingsItem.settingsType}`}>
                        <label className="caption">{this.state.settingsItem.settingsTitle}</label>
                        <div className="iteration-count">
                            <button className="iteration-decrease"
                                    onClick={this.onDecreaseValue.bind(this, this.state.settingsItem.settingsType)}>
                                -
                            </button>
                            <input type="text" id={this.state.settingsItem.settingsType}
                                   value={this.state.settingsItem.settingsValue} disabled/>
                            <button className="iteration-increase"
                                    onClick={this.onIncreaseValue.bind(this, this.state.settingsItem.settingsType)}>
                                +
                            </button>
                        </div>
                        <p>Please select a value in {this.state.settingsItem.settingsRule}
                            <span className="measure">{this.state.settingsItem.settingsMeasure}</span>
                        </p>
                    </div>
                ) : (<></>)}
            </>

        );
    }
}

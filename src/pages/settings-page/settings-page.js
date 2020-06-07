import React, {Component} from 'react';
import {Header} from "../../components/header/header";
import {SettingsItem} from "../../components/settings-item/settings-item";

export class SettingsPage extends Component {

    constructor() {
        super();

        this.state = {};

        this.onUpdateSettingsClick = this.onUpdateSettingsClick.bind(this);
    }

    componentDidMount() {
        this.props.getSettings(localStorage.getItem('token'));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.settings !== this.state.settings) {
            this.setState({settings: nextProps.settings});
        }
    }

    onUpdateSettingsClick(e) {
        e.preventDefault();

        const shortBreak = document.getElementById('criterion-short-break').value;
        const workTime = document.getElementById('criterion-work-time').value;

        this.props.updateSettings(localStorage.getItem('token'), {
            shortBreak,
            workTime,
            longBreak: '',
            workIterations: ''
        }, (successMessage) => {
            this.setState({successMessage: successMessage});
        });
    };

    render() {

        const settings = [
            {
                settingsType: 'criterion-short-break',
                settingsTitle: 'SHORT BREAK',
                settingsValue: this.state.settings ? this.state.settings.shortBreak : '',
                settingsMeasure: 'minutes',
            }, {
                settingsType: 'criterion-work-time',
                settingsTitle: 'WORK TIME',
                settingsValue: this.state.settings ? this.state.settings.workTime : '',
                settingsMeasure: 'minutes',
            }
        ];


        return (
            <>
                <Header/>
                <div className="page-wrapper">
                    <main className="main" id="main">
                        <div className="page-heading">
                            <h1>Pomodoros settings</h1>
                        </div>

                        <section className="section-pomodoros">
                            {this.state.successMessage ? (
                                <p className="success-message form-success">{this.state.successMessage}</p>
                            ) : (<></>)}
                            <div className="pomodoros-settings">
                                {settings.map(settingsItem => {
                                    return (<SettingsItem
                                        settingsItem={settingsItem}
                                    />)
                                })}
                            </div>

                            {/*<section class="section-cycle">
                                <h3>Your cycle</h3>
                                <div class="cycle-info" id="cycle-info">
                                    <div class="cycle-info-caption" id="start-cycle">0m</div>

                                    <div class="cycle-info-caption" id="finish-cycles"></div>
                                </div>
                                <div class="cycle-graphic" id="cycle-graphic">

                                </div>
                                <div class="time-info" id="time-info"></div>
                            </section>
                            <div class="pomodoros-finishing">
                                <button class="button-ok" id="goToTaskList">Go to Task</button>
                                <button class="button-save" id="saveSettings">Save</button>
                            </div>*/}
                            <button className="paragraph settings-update button-save"
                                    onClick={this.onUpdateSettingsClick}>
                                Update
                            </button>
                        </section>

                        <section className="section-name section-categories">
                            <p className="heading-categories">Categories list overview</p>
                            <ul className="list-categories">
                                <li className="categories-work">Work</li>
                                <li className="categories-education">Education</li>
                                <li className="categories-hobby">Hobby</li>
                                <li className="categories-sport">Sport</li>
                                <li className="categories-others">Other</li>
                            </ul>
                        </section>
                    </main>
                </div>
            </>
        );
    }
}

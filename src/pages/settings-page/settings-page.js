import React, {Component} from 'react';
import {Header} from "../../components/header/header";
import {SettingsItem} from "../../components/settings-item/settings-item";

export class SettingsPage extends Component {

    constructor() {
        super();

        this.state = {};

        this.onUpdateSettingsClick = this.onUpdateSettingsClick.bind(this);
    }

    onUpdateSettingsClick(e) {
        e.preventDefault();

        const shortBreak = document.getElementById('shortBreak').value;
        const workTime = document.getElementById('workTime').value;

        /*this.props.login({shortBreak, workTime}, () => {
            this.setState({redirect: true});
        });*/
    };

    render() {
        const settings = [
            {
                settingsType: 'shortBreak',
                settingsTitle: 'Short break',
                settingsValue: 5,
                settingsMaxValue: 1,
                settingsMinValue: 7,
                settingsMeasure: 'minutes',
            }, {
                settingsType: 'workTime',
                settingsTitle: 'Work time',
                settingsValue: 20,
                settingsMaxValue: 10,
                settingsMinValue: 30,
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

                            <div className="pomodoros-settings">
                                {settings.map(settingsItem => {
                                    return (<SettingsItem settingsItem={settingsItem} />)
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
                            <button className="paragraph settings-update" onClick={this.onUpdateSettingsClick}>Update</button>
                        </section>
                    </main>
                </div>
            </>
        );
    }
}
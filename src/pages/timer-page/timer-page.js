import React, {Component} from 'react';
import {Redirect} from 'react-router';
import routerPaths from "../../constants/router-paths";
import CATEGORIES from "../../constants/categories";
import globalListData from "../../constants/globalList";

import {Header} from "../../components/header/header";
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import Countdown from 'react-countdown';

import {Task} from "../../components/task/task";
import {AddTaskModalConnector} from "../../components/add-task";

export class TimerPage extends Component {
    constructor() {
        super();

        this.state = {

        };

        this.renderPomodoros = this.renderPomodoros.bind(this);

        this.startTask = this.startTask.bind(this);
        this.finishPomodoro = this.finishPomodoro.bind(this);
        this.failPomodoro = this.failPomodoro.bind(this);
    }

    componentDidMount() {
        const iterations = parseInt(this.props.taskData.estimation);
        const failedPomodoros = [];

        for (var i = 0; i < iterations; i++) {
            failedPomodoros.push(0);
        }

        this.setState({
            iterations: iterations,
            failedPomodoros: failedPomodoros,
            activePomodoro: -1,
            isBreak: false,
            isTimerProgress: false
        });
    }

    renderPomodoros() {
        const pomodoros = [];

        if (this.state.failedPomodoros) {
            for (var i = 0; i < this.state.failedPomodoros.length; i++) {
                if (this.state.failedPomodoros[i] === 0) {
                    pomodoros.push(<li key={i} className="li-empty-tomato"/>)
                } else if (this.setState.failedPomodoros[i] === 1) {
                    pomodoros.push(<li key={i} className="li-fill-tomato"/>)
                } else {
                    pomodoros.push(<li key={i} className="li-failed-tomato"/>)
                }
            }
        }

        return pomodoros;
    }

    startTask() {
        this.setState({
            isTimerProgress: true,
            activePomodoro: this.state.activePomodoro + 1
        });

        console.log(this.state);
    }

    startPomodoro() {
        this.setState({
            isTimerProgress: true,
            activePomodoro: this.state.activePomodoro
        });
    }

    finishPomodoro() {
        this.setState({
            isTimerProgress: false,
            activePomodoro: this.state.activePomodoro,
            isBreak: true
        });
    }

    failPomodoro() {
        this.setState({
            isTimerProgress: false,
            activePomodoro: this.state.activePomodoro,
            isBreak: true
        });
    }

    startBreak() {
        this.setState({
            isTimerProgress: true,
            isBreak: true
        });
    }

    finishBreak() {
        this.setState({
            isTimerProgress: false,
            isBreak: false
        });
    }

    render() {
        const pomodoros = this.renderPomodoros();
        console.log(this.state);

        return (
            <>
                <Header/>
                <div id="page-content-wrapper">
                    <div className="arrow-left">
                        <a className="icon-arrow-left" id="linkToTaskList" title="Go to Tasks list"/>
                    </div>
                    <main className="main-timer" id="main-timer">
                        <section className="page-heading" id="page-heading">
                            <h1 id="title">{this.props.taskData.title}</h1>
                            <h2 id="description">{this.props.taskData.description}</h2>
                        </section>
                        <section id="timerContainer">
                            <div className="all-iteration-list-wrapper" id="listTomatos">
                                <ul className="all-iteration-list">
                                    {pomodoros}
                                </ul>
                            </div>
                            <div className="timer-wrapper" id="timerWrapper">

                                {this.state.isBreak ? (
                                    <CountdownCircleTimer
                                        isPlaying={this.state.isTimerProgress}
                                        size={264}
                                        colors={[['#16A085']]}
                                        duration={this.props.settings.shortBreak * 60}
                                        initialRemainingTime={this.props.settings.shortBreak * 60}
                                    >
                                        {({remainingTime}) => Math.floor(remainingTime / 60)}
                                    </CountdownCircleTimer>
                                ) : (
                                    <CountdownCircleTimer
                                        isPlaying={this.state.isTimerProgress}
                                        size={264}
                                        colors={[['#FFA841']]}
                                        duration={this.props.settings.workTime * 60}
                                        initialRemainingTime={this.props.settings.workTime * 60}
                                    >
                                        {({remainingTime}) => Math.floor(remainingTime / 60)}
                                    </CountdownCircleTimer>
                                )}
                            </div>
                            {
                                this.state.activePomodoro === -1 ? (
                                    <div className="start-iterations" id="timerButtons">
                                        <button className="button-save start-pomodoro" onClick={this.startTask}>
                                            Start
                                        </button>
                                    </div>
                                ) : (<></>)
                            }

                            {
                                this.state.activePomodoro > -1 && !this.state.isBreak ? (
                                    <div className="fail-finish-pomodora" id="timerButtons">
                                        <button className="button-cancel" onClick={this.failPomodoro}>
                                            Fail Pomodora
                                        </button>
                                        <button className="button-save" onClick={this.finishPomodoro}>
                                            Finish Pomodora
                                        </button>
                                    </div>
                                ) : (<></>)
                            }

                            {
                                this.state.isBreak ? (
                                    <div className="start-finish-pomodora" id="timerButtons">
                                        <button className="button-save  start-pomodoro" id="startPomodoro">
                                            Start Pomodora
                                        </button>
                                    </div>
                                ) : (<></>)
                            }
                        </section>
                    </main>
                    <div className="arrow-right">
                        <a className="icon-arrow-right" id="tasks" title="Go to Report"/>
                    </div>
                </div>
            </>
        );
    }
}

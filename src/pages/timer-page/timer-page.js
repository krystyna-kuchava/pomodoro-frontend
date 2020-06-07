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
import {convertToDate} from "../../constants/convertDate";

export class TimerPage extends Component {
    constructor() {
        super();

        this.state = {
            redirectToTasksList: false,
            redirectToReports: false
        };

        this.renderPomodoros = this.renderPomodoros.bind(this);
        this.renderFirstIteration = this.renderFirstIteration.bind(this);
        this.renderSecondIteration = this.renderSecondIteration.bind(this);
        this.renderThirdIteration = this.renderThirdIteration.bind(this);
        this.renderForthIteration = this.renderForthIteration.bind(this);
        this.renderLastIteration = this.renderLastIteration.bind(this);

        this.startTask = this.startTask.bind(this);
        this.finishPomodoro = this.finishPomodoro.bind(this);
        this.failPomodoro = this.failPomodoro.bind(this);
        this.startPomodoro = this.startPomodoro.bind(this);
        this.finishTask = this.finishTask.bind(this);
        this.failLastPomodoro = this.failLastPomodoro.bind(this);

        this.navigateToTaskList = this.navigateToTaskList.bind(this);
        this.navigateToReport = this.navigateToReport.bind(this);
    }

    componentDidMount() {
        const iterations = parseInt(this.props.taskData.estimation);
        const failedPomodoros = [];
        const arrayOfIterations = [];

        for (var i = 0; i < iterations; i++) {
            failedPomodoros.push(0);
            arrayOfIterations.push(-1);
        }

        //arrayOfIterations[0] = 1;

        this.setState({
            iterations: iterations,
            failedPomodoros: failedPomodoros,
            arrayOfIterations: arrayOfIterations,
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
                } else if (this.state.failedPomodoros[i] === 1) {
                    pomodoros.push(<li key={i} className="li-fill-tomato"/>)
                } else {
                    pomodoros.push(<li key={i} className="li-failed-tomato"/>)
                }
            }
        }

        return pomodoros;
    }

    startTask() {
        const arrayOfIterations = this.state.arrayOfIterations;
        arrayOfIterations[0] = 1;

        this.setState({
            isTimerProgress: true,
            activePomodoro: this.state.activePomodoro + 1,
            arrayOfIterations: arrayOfIterations
        });
    }

    startPomodoro() {
        const arrayOfIterations = this.state.arrayOfIterations;
        arrayOfIterations[this.state.activePomodoro] = -1;
        arrayOfIterations[this.state.activePomodoro + 1] = 1;

        this.setState({
            isBreak: false,
            isTimerProgress: true,
            activePomodoro: this.state.activePomodoro + 1,
            arrayOfIterations: arrayOfIterations
        });
    }

    finishPomodoro() {
        const failedPomodoros = this.state.failedPomodoros;
        failedPomodoros[this.state.activePomodoro] = 1;

        this.setState({
            isTimerProgress: false,
            failedPomodoros: failedPomodoros,
            isBreak: true
        });
    }

    failPomodoro() {
        const failedPomodoros = this.state.failedPomodoros;
        failedPomodoros[this.state.activePomodoro] = -1;

        this.setState({
            isTimerProgress: false,
            failedPomodoros: failedPomodoros,
            isBreak: true
        });
    }

    finishTask() {
        const failedPomodoros = this.state.failedPomodoros;
        failedPomodoros[this.state.activePomodoro] = 1;
        const status = this.defineStatusOfTask(failedPomodoros);
        const completeDay = convertToDate(new Date());

        const taskData = {
            status,
            failedPomodoros,
            completeDay
        };

        this.props.finishTask(localStorage.getItem('token'), this.props.taskData.taskId, taskData, () => {
            this.setState({
                isTimerProgress: false,
                failedPomodoros: failedPomodoros,
                taskIsFinished: true
            });
        });
    }

    failLastPomodoro() {
        const failedPomodoros = this.state.failedPomodoros;
        failedPomodoros[this.state.activePomodoro] = -1;
        const status = this.defineStatusOfTask(failedPomodoros);
        const completeDay = convertToDate(new Date());

        const taskData = {
            status,
            failedPomodoros,
            completeDay
        };

        this.props.finishTask(localStorage.getItem('token'), this.props.taskData.taskId, taskData, () => {
            this.setState({
                isTimerProgress: false,
                failedPomodoros: failedPomodoros,
                taskIsFinished: true
            });
        });
    }

    defineStatusOfTask(failedPomodoros) {
        let countFailedPomodoros = 0;
        let countFinishedPomodoros = 0;

        failedPomodoros.map((pomodoro) => {
            if (pomodoro === 1) {
                countFinishedPomodoros++;
            } else {
                countFailedPomodoros++;
            }
        });

        return countFinishedPomodoros > countFailedPomodoros ? 'DONE_LIST' : 'FAILED';
    }

    renderFirstIteration(isActiveIteration) {
        return <>
            {!this.state.isBreak ? (<CountdownCircleTimer
                isPlaying={!this.state.isBreak && isActiveIteration}
                size={264}
                colors={[['#FFA841']]}
                duration={this.props.settings.workTime * 60}
                initialRemainingTime={this.props.settings.workTime * 60}
                onComplete={this.finishPomodoro}
            >
                {({remainingTime}) => Math.floor(remainingTime / 60)}
            </CountdownCircleTimer>) : (<></>)}
            {this.state.isBreak ? (<CountdownCircleTimer
                isPlaying={this.state.isBreak && isActiveIteration}
                size={264}
                colors={[['#16A085']]}
                duration={this.props.settings.shortBreak * 60}
                initialRemainingTime={this.props.settings.shortBreak * 60}
            >
                {({remainingTime}) => Math.floor(remainingTime / 60)}
            </CountdownCircleTimer>) : (<></>)}
        </>
    }

    renderSecondIteration(isActiveIteration) {
        return <>
            {!this.state.isBreak ? (<CountdownCircleTimer
                isPlaying={!this.state.isBreak && isActiveIteration}
                size={264}
                colors={[['#FFA841']]}
                duration={this.props.settings.workTime * 60}
                initialRemainingTime={this.props.settings.workTime * 60}
                onComplete={this.finishPomodoro}
            >
                {({remainingTime}) => Math.floor(remainingTime / 60)}
            </CountdownCircleTimer>) : (<></>)}
            {this.state.isBreak ? (<CountdownCircleTimer
                isPlaying={this.state.isBreak && isActiveIteration}
                size={264}
                colors={[['#16A085']]}
                duration={this.props.settings.shortBreak * 60}
                initialRemainingTime={this.props.settings.shortBreak * 60}
            >
                {({remainingTime}) => Math.floor(remainingTime / 60)}
            </CountdownCircleTimer>) : (<></>)}
        </>
    }

    renderThirdIteration(isActiveIteration) {
        return <>
            {!this.state.isBreak ? (<CountdownCircleTimer
                isPlaying={!this.state.isBreak && isActiveIteration}
                size={264}
                colors={[['#FFA841']]}
                duration={this.props.settings.workTime * 60}
                initialRemainingTime={this.props.settings.workTime * 60}
                onComplete={this.finishPomodoro}
            >
                {({remainingTime}) => Math.floor(remainingTime / 60)}
            </CountdownCircleTimer>) : (<></>)}
            {this.state.isBreak ? (<CountdownCircleTimer
                isPlaying={this.state.isBreak && isActiveIteration}
                size={264}
                colors={[['#16A085']]}
                duration={this.props.settings.shortBreak * 60}
                initialRemainingTime={this.props.settings.shortBreak * 60}
            >
                {({remainingTime}) => Math.floor(remainingTime / 60)}
            </CountdownCircleTimer>) : (<></>)}
        </>
    }

    renderForthIteration(isActiveIteration) {
        return <>
            {!this.state.isBreak ? (<CountdownCircleTimer
                isPlaying={!this.state.isBreak && isActiveIteration}
                size={264}
                colors={[['#FFA841']]}
                duration={this.props.settings.workTime * 60}
                initialRemainingTime={this.props.settings.workTime * 60}
                onComplete={this.finishPomodoro}
            >
                {({remainingTime}) => Math.floor(remainingTime / 60)}
            </CountdownCircleTimer>) : (<></>)}
            {this.state.isBreak ? (<CountdownCircleTimer
                isPlaying={this.state.isBreak && isActiveIteration}
                size={264}
                colors={[['#16A085']]}
                duration={this.props.settings.shortBreak * 60}
                initialRemainingTime={this.props.settings.shortBreak * 60}
            >
                {({remainingTime}) => Math.floor(remainingTime / 60)}
            </CountdownCircleTimer>) : (<></>)}
        </>
    }

    renderLastIteration(isActiveIteration) {
        return <>
            <CountdownCircleTimer
                isPlaying={!this.state.isBreak && isActiveIteration && !this.state.taskIsFinished}
                size={264}
                colors={[['#FFA841']]}
                duration={this.props.settings.workTime * 60}
                initialRemainingTime={this.props.settings.workTime * 60}
                onComplete={this.finishTask}
            >
                {({remainingTime}) => Math.floor(remainingTime / 60)}
            </CountdownCircleTimer>
        </>
    }

    navigateToTaskList() {
        this.setState({redirectToTasksList: true});
    }

    navigateToReport() {
        this.setState({redirectToReports: true});
    }

    render() {
        const pomodoros = this.renderPomodoros();

        if (this.state.redirectToTasksList) {
            return <Redirect push to={routerPaths.TASKS_LIST}/>;
        }

        if (this.state.redirectToReports) {
            return <Redirect push to={routerPaths.REPORT}/>;
        }

        return (
            <>
                <div id="page-content-wrapper">
                    {
                        this.state.activePomodoro < 0 ? (
                            <div className="arrow-left">
                                <a className="icon-arrow-left" title="Go to Tasks list"
                                   onClick={this.navigateToTaskList}/>
                            </div>
                        ) : (<></>)
                    }
                    <Header isBlocked={this.state.activePomodoro > -1}/>
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
                                <>
                                    {(this.state.activePomodoro < 1 && this.state.arrayOfIterations &&
                                        this.state.arrayOfIterations.length > 1) ? (this.renderFirstIteration(
                                        this.state.arrayOfIterations &&
                                        this.state.arrayOfIterations.length > 1 &&
                                        this.state.arrayOfIterations[0] === 1)) : (<></>)}

                                    {(this.state.arrayOfIterations &&
                                        this.state.arrayOfIterations.length > 2 &&
                                        this.state.arrayOfIterations[1] === 1) ? (this.renderSecondIteration(
                                        this.state.arrayOfIterations &&
                                        this.state.arrayOfIterations.length > 2 &&
                                        this.state.arrayOfIterations[1] === 1)) : (<></>)}

                                    {(this.state.arrayOfIterations &&
                                        this.state.arrayOfIterations.length > 3 &&
                                        this.state.arrayOfIterations[2] === 1) ? (this.renderThirdIteration(
                                        this.state.arrayOfIterations &&
                                        this.state.arrayOfIterations.length > 3 &&
                                        this.state.arrayOfIterations[2] === 1)) : (<></>)}

                                    {(this.state.arrayOfIterations &&
                                        this.state.arrayOfIterations.length > 4 &&
                                        this.state.arrayOfIterations[3] === 1) ? (this.renderForthIteration(
                                        this.state.arrayOfIterations &&
                                        this.state.arrayOfIterations.length > 4 &&
                                        this.state.arrayOfIterations[3] === 1)) : (<></>)}

                                    {((this.state.arrayOfIterations &&
                                        this.state.arrayOfIterations[this.state.arrayOfIterations.length - 1] === 1)) ||
                                    (this.state.arrayOfIterations && this.state.arrayOfIterations.length === 1) ? (this.renderLastIteration(this.state.arrayOfIterations &&
                                        this.state.arrayOfIterations[this.state.arrayOfIterations.length - 1] === 1)) : (<></>)}
                                </>
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

                            {(this.state.arrayOfIterations &&
                                this.state.arrayOfIterations[this.state.arrayOfIterations.length - 1] !== 1) &&
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
                                        <button className="button-save  start-pomodoro" onClick={this.startPomodoro}>
                                            Start Pomodora
                                        </button>
                                    </div>
                                ) : (<></>)
                            }

                            {
                                (this.state.arrayOfIterations && !this.state.taskIsFinished &&
                                    this.state.arrayOfIterations[this.state.arrayOfIterations.length - 1] === 1) ? (
                                    <div className="fail-finish-pomodora" id="timerButtons">
                                        <button className="button-cancel" onClick={this.failLastPomodoro}>
                                            Fail Pomodora
                                        </button>
                                        <button className="button-save" onClick={this.finishTask}>
                                            Finish Task
                                        </button>
                                    </div>
                                ) : (<></>)
                            }

                            {
                                this.state.taskIsFinished ? (
                                    <div className="fail-finish-pomodora" id="timerButtons">
                                        Task is Finished!
                                    </div>
                                ) : (<></>)
                            }
                        </section>
                    </main>
                    {
                        this.state.taskIsFinished ? (
                            <div className="arrow-right">
                                <a className="icon-arrow-right" title="Go to Report" onClick={this.navigateToReport}/>
                            </div>
                        ) : (<></>)
                    }
                </div>
            </>
        );
    }
}

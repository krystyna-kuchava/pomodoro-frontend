import React, {Component} from 'react';
import {Redirect} from 'react-router';
import routerPaths from "../../constants/router-paths";
import CATEGORIES from "../../constants/categories";
import globalListData from "../../constants/globalList";
import {Header} from "../../components/header/header";

import {createChartOfDay} from './chartDay';
import {creatChartForWeekOrMonth} from './chartWeekOrMonth';
import {arrayOfDaysOfMonth} from './dates';
import {Task} from "../../components/task/task";
import {AddTaskModalConnector} from "../../components/add-task";

export class ReportsPage extends Component {
    constructor() {
        super();

        this.state = {

            isDayReport: true,
            isWeekReport: false,
            isMonthReport: false,

            isAllFilter: true,
            isUrgentFilter: false,
            isHighFilter: false,
            isNormalFilter: false,
            isLowFilter: false,

            globalListData: globalListData,

            isAddTaskModalWindow: false,
            isRemoveTaskModalWindow: false,
            isEditTaskModalWindow: false,
        };

        this.goToDayReport = this.goToDayReport.bind(this);
        this.goToWeekReport = this.goToWeekReport.bind(this);
        this.goToMonthReport = this.goToMonthReport.bind(this);

    }

    componentDidMount() {
        this.props.getDayReport(localStorage.getItem('token'),(data) => {
            this.setState({todayReport: data});

            createChartOfDay(this.state.todayReport);
        });

        this.props.getMonthReport(localStorage.getItem('token'), (data) => {
            this.setState({monthReport: data});

        });
    }

    goToDayReport() {
        if (!this.state.isDayReport) {
            this.setState({isDayReport: true, isWeekReport: false, isMonthReport: false});

            this.renderReport(1);
        }
    }

    goToWeekReport() {
        if (!this.state.isWeekReport) {
            this.setState({isDayReport: false, isWeekReport: true, isMonthReport: false});

            this.renderReport(7);
        }
    }

    goToMonthReport() {
        if (!this.state.isMonthReport) {
            this.setState({isDayReport: false, isWeekReport: false, isMonthReport: true});

            this.renderReport(30);
        }
    }

    fillChartForWeekOrMonth(duration, stack1, stack2) {
        let categories = arrayOfDaysOfMonth().slice(0, duration); //array of dates
        categories = categories.map((date) => {
            date = date.slice(0, 2);
            return date;
        });

        const reports = this.state.monthReport.slice(0, duration);
        const arrayOfReportsByPriories = [[], [], [], [], []];

        reports.map((report) => {
            arrayOfReportsByPriories[0].push(report.reportTasks[0]);
            arrayOfReportsByPriories[1].push(report.reportTasks[1]);
            arrayOfReportsByPriories[2].push(report.reportTasks[2]);
            arrayOfReportsByPriories[3].push(report.reportTasks[3]);
            arrayOfReportsByPriories[4].push(report.reportTasks[4]);
        });
        categories.reverse();
        arrayOfReportsByPriories[0].reverse();
        arrayOfReportsByPriories[1].reverse();
        arrayOfReportsByPriories[2].reverse();
        arrayOfReportsByPriories[3].reverse();
        arrayOfReportsByPriories[4].reverse();

        creatChartForWeekOrMonth(categories, arrayOfReportsByPriories, stack1, stack2);
    }

    renderReport(duration) {
        switch (duration) {
            case 1:
                createChartOfDay(this.state.todayReport);
                break;
            case 7:
                this.fillChartForWeekOrMonth(duration, 'completed', 'uncompleted');
                break;
            case 30:
                this.fillChartForWeekOrMonth(duration, 'completed', 'completed');
                break;
            default:
                createChartOfDay(this.state.todayReport);
        }
    }

    render() {

        return (
            <>
                <Header/>


                <div className="page-wrapper">
                    <main className="main" id="main">
                        <div className="page-heading">
                            <h1>Reports</h1>
                        </div>
                        <div id="tasksNavigation" className="nav-task-type-wrapper">
                            <nav className="nav-report-type-wrapper">
                                <ul className="nav-report" id="navigation">
                                    <li className="navigation-item">
                                        <a className={this.state.isMonthReport ? 'selected-item' : ''}
                                           onClick={this.goToMonthReport}>
                                            Month
                                        </a>
                                    </li>
                                    <li className="navigation-item">
                                        <a className={this.state.isWeekReport ? 'selected-item' : ''}
                                           onClick={this.goToWeekReport}>
                                            Week
                                        </a>
                                    </li>
                                    <li className="navigation-item">
                                        <a className={this.state.isDayReport ? 'selected-item' : ''}
                                           onClick={this.goToDayReport}>
                                            Day
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div id="page-content-wrapper">
                            <section className="report-info" id="report-info">
                                <div id="containerCharts">

                                </div>
                            </section>
                            <div className="report-description-wrapper">
                                <ul className="report-description">
                                    <li className="report-description-item priority-urgentP">Urgent</li>
                                    <li className="report-description-item priority-highP">High</li>
                                    <li className="report-description-item priority-middleP">Normal</li>
                                    <li className="report-description-item priority-lowP">Low</li>
                                    <li className="report-description-item priority-failedP">Failed</li>
                                </ul>
                            </div>
                            <nav className="nav-report-type-wrapper" id="navTypes">

                            </nav>
                        </div>
                    </main>
                </div>
            </>
        );
    }
}

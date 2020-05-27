import React, {Component} from 'react';
import { Redirect } from 'react-router';
import routerPaths from "../../constants/router-paths";

export class Header extends Component {
    constructor() {
        super();

        this.state = {
            redirectToTasksList: false,
            redirectToSettings: false,
            redirectToReports: false
        };

        this.onNavigationClick = this.onNavigationClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectToTimer !== this.state.redirectToTimer) {
            this.setState({redirectToTimer: nextProps.redirectToTimer});
        }
    }

    onNavigationClick(e) {
        const targetId = e.target.id;
        const currentHref = window.location.pathname;

        switch (targetId) {
            case 'tasksList':
                if (!currentHref.includes(routerPaths.TASKS_LIST)) {
                    this.setState({redirectToTasksList: true});
                }
                break;

            case 'reports':
                if (!currentHref.includes(routerPaths.REPORT)) {
                    this.setState({redirectToReports: true});
                }
                break;

            case 'settings':
                if (!currentHref.includes(routerPaths.SETTINGS)) {
                    this.setState({redirectToSettings: true});
                }
                break;
        }
    }

    render() {
        const currentHref = window.location.pathname;

        if (this.state.redirectToTimer) {
            return <Redirect push to={routerPaths.TIMER} />;
        }

        if (this.state.redirectToTasksList) {
            return <Redirect push to={routerPaths.TASKS_LIST} />;
        }

        if (this.state.redirectToSettings) {
            return <Redirect push to={routerPaths.SETTINGS} />;
        }

        if (this.state.redirectToReports) {
            return <Redirect push to={routerPaths.REPORT} />;
        }

        return (
            <header className="header">
                <div className="logo">
                    {/*<img src="../../assets/images/svg-images/Logo.svg" alt="logo-pomodoro"/>*/}
                </div>
                <nav className="main-nav-wrapper">
                    <ul className="main-nav">
                        <li>
                            <a className={currentHref.includes(routerPaths.TASKS_LIST) ? 'icon-list selected-item' : 'icon-list'} id="tasksList" title="Go to Tasks list" onClick={this.onNavigationClick}/>
                        </li>
                        <li>
                            <a className={currentHref.includes(routerPaths.REPORT) ? 'icon-statistics selected-item' : 'icon-statistics'} id="reports" title="Go to Reports" onClick={this.onNavigationClick}/>
                        </li>
                        <li>
                            <a className={currentHref.includes(routerPaths.SETTINGS) ? 'icon-settings selected-item' : 'icon-settings'} id="settings" title="Go to Settings" onClick={this.onNavigationClick}/>
                        </li>
                    </ul>
                </nav>
            </header>

        ) ;
    }
}

import React from 'react';

import './LoggedInLayout.scss';
import AboutPage from "./AboutPage.jsx";
import {Route, Redirect} from "react-router";
import TasklistsPageContainer from "../containers/TasklistsPage.jsx";

class LoggedInLayout extends React.Component {
    render() {
        return (
            <div className='LoggedInLayout'>
                <div className='LoggedInLayout__content'>
                    <Route render={(props) => {
                        if (props.location.pathname === '/') {
                            return <Redirect to={{pathname: "/lists"}}/>;
                        }
                        else return null;
                    }}/>
                    <Route path='/about' component={AboutPage} />
                    <Route path='/lists' component={TasklistsPageContainer} />
                </div>
            </div>
        );
    }
}

export default LoggedInLayout;

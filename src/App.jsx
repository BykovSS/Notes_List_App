import React from 'react';
import {Route, Redirect} from 'react-router';
import LoginPage from './containers/LoginPage.jsx';
import SessionStore from './stores/SessionStore';

import './styles/base.scss';
import LoggedInLayout from "./components/LoggedInLayout.jsx";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Route path='/login' component={LoginPage} />
                <Route render={(props) => {
                    if (!SessionStore.isLoggedIn() && props.location.pathname.indexOf('login') === -1) {
                        return <Redirect to={{pathname: "/login", state: {nextPathname: props.location.pathname}}}/>;
                    }
                    else {
                        return <LoggedInLayout/>;
                    }
                }}/>
            </div>
        )
    }
}

export default App;
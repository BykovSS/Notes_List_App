import React from 'react';

import SessionActions from "../actions/SessionActions";
import SessionStore from '../stores/SessionStore';

import LoginPage from '../components/LoginPage.jsx';

function getStateFromFlux() {
    return {
        isLoggedIn: SessionStore.isLoggedIn()
    }
}

class LoginPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = getStateFromFlux();
        this.handleLogIn = this.handleLogIn.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        SessionStore.addChangeListener(this._onChange);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.isLoggedIn) {
            const {location} = this.props;
            if (location.state && location.state.nextPathname) {
                this.props.history.replace(location.state.nextPathname);
            }
            else {
                this.props.history.replace('/lists');
            }
        }
    }

    componentWillUnmount() {
        SessionStore.removeChangeListener(this._onChange);
    }

    handleLogIn() {
        SessionActions.authorize();
    }

    render() {
        return (
            <LoginPage onLogIn={this.handleLogIn} />
        )
    }

    _onChange() {
        this.setState(getStateFromFlux());
    }
}

export default LoginPageContainer;
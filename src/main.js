import ReactDOM from 'react-dom';
import React from 'react';
import {Redirect, Route} from 'react-router';
import {HashRouter} from 'react-router-dom';

import App from './App.jsx';
import SessionActions from "./actions/SessionActions";

window.handleGoogleApiLoaded = () => {
    SessionActions.authorize(true, renderApp);
};

function renderApp() {
    ReactDOM.render(
        <HashRouter>
            <Route path='/' component={App} />
        </HashRouter>,
        document.getElementById('mount-point')
    );
}
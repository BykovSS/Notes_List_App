import React from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';

import './AboutPage.scss';

class AboutPage extends React.Component {
    render() {
        return (
            <div className='AboutPage'>
                <Paper
                    elevation={1}
                    className='AboutPage__content'
                >
                    <h2> Notes List App </h2>
                    <p>This application is written based on <a href='https://developers.google.com/google-apps/tasks/'>
                        Google Tasks API</a> using Material Design concepts.</p>
                    <p>It is a final result of Notes List App.</p>
                </Paper>
            </div>
        );
    }
}

export default AboutPage;

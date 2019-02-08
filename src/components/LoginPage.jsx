import React from 'react';

import Button from '@material-ui/core/Button';

import './LoginPage.scss';

class LoginPage extends React.Component {
    render() {
        return (
            <div className="LoginPage">
                <div className="LoginPage__banner">
                    <div className="LoginPage__text">
                        <h1>Notes List App</h1>
                        <p>Organise your life!</p>
                        <Button variant="contained" className="login-button" onClick={this.props.onLogIn}>
                            Log in with Google
                        </Button>
                    </div>
                    <img
                        src="img/desk.png"
                        alt="picture"
                        className="LoginPage__image"
                    />
                </div>
            </div>
        )
    }
}

export default LoginPage;
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap'

const VK = window.VK;

class AuthPage extends Component {

    loginButtonClickHandler = () => {
       VK.Auth.login(() => this.props.changeIsAuthorized());
    };

    statusButtonClickHandler = () => {
        VK.Auth.getLoginStatus(function (response) {
            console.log(response);
        });
    };

    render() {
        return (
            <div>
                <Button onClick={this.loginButtonClickHandler} variation="primary">Log in</Button>
                <Button onClick={this.statusButtonClickHandler} variation="primary">Status</Button>
            </div>
        );
    }
}

export default withRouter(AuthPage);

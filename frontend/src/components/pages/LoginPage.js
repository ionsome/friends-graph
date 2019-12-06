import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import bgVideo from '../../res/bg-video.mp4'

const VK = window.VK;

class LoginPage extends Component {

    loginButtonClickHandler = () => {
       VK.Auth.login(() => this.props.changeIsAuthorized());
    };

    login = () => {
        return 2+2;
    }
    render() {
        return (
            <div>
                <video id="bg-video" src={bgVideo} autoPlay="true" muted="true" loop="true"/>
                <div id="vk_auth"></div>
                    {this.props.isInProduction && this.login()}
                <div className="login-content">
                    <Button onClick={this.loginButtonClickHandler} className="position-absolute">Log in</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginPage);

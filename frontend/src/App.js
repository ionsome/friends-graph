import React, { Component } from 'react';
import { MainPage } from './components/pages/MainPage';
import { LoginPage } from './components/pages/LoginPage';

const VK = window.VK;

class App extends Component {

    constructor(props) {
        super(props);

        this.state = { 'showMainPage': false, 'vkInit': false };
        this.isAuthorized = false;
    }

    changeIsAuthorized() {
        this.isAuthorized = !this.isAuthorized;
        this.setState({ 'showMainPage': this.isAuthorized });
    }

    componentDidMount() {
        if (this.props.isInProduction) {
            new Promise((resolve) => {
                VK.init({ apiId: 7154329 });
                VK.Auth.getLoginStatus((response) => {
                    resolve(response);
                })
            }).then((response) => {
                console.log(response);
                this.isAuthorized = response && response.status === 'connected';
                this.setState({ 'showMainPage': this.isAuthorized, 'vkInit': true, 'mainUserId' : response.session.mid });
            });
        }
        else {
            this.setState({ 'showMainPage': true });
        }
    }

    render() {
        return <> {this.state.showMainPage ?
            <MainPage {...this.props} changeIsAuthorized={this.changeIsAuthorized.bind(this)} mainUserId={this.state.mainUserId} /> :
            <LoginPage vkInit={this.state.vkInit} {...this.props} changeIsAuthorized={this.changeIsAuthorized.bind(this)} />}
        </>
    }
}

export default App;

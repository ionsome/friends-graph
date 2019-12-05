import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';

const VK = window.VK;

class App extends Component {

    constructor(props) {
        super(props);

        this.state = { 'showMainPage': false };
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
                this.isAuthorized = response && response.status === 'connected';
                this.setState({ 'showMainPage': this.isAuthorized });
            });
        }
        else {
            this.setState({ 'showMainPage': true });
        }
    }

    render() {
        return (
            <Router>
                <Route path="/" render={(props) => this.state.showMainPage ?
                    <MainPage {...props} changeIsAuthorized={this.changeIsAuthorized.bind(this)} /> :
                    <LoginPage {...props} changeIsAuthorized={this.changeIsAuthorized.bind(this)} />}
                />
            </Router >
        );
    }
}

export default App;

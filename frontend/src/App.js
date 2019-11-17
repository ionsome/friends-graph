import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';

const VK = window.VK;

class App extends Component {

    render() {
        let pageContent;

        if (this.props.isInProduction) {
            VK.init({ apiId: 7154329 });
            VK.Auth.getLoginStatus((response) => {
                this.props.connected = response.status === 'connected';
            });
        }
        if ((this.props.isInProduction && this.props.connected) || !this.props.isInProduction) {
            pageContent = <Route
                path="/"
                render={(props) => <MainPage {...props} />} />
        }
        else {
            pageContent = <Route
                path="/"
                render={(props) => <AuthPage {...props} />} />
        }
        return (
            <Router>
                {pageContent}
            </Router>
        );
    }
}

export default App;

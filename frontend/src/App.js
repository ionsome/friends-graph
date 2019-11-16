import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import Header from './components/Header';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let pageContent;
        if (this.props.isOnHeroku) {
            /*eslint-disable */
            VK.init({ apiId: 7154329 });
            VK.Auth.getLoginStatus(function (response) {
                if (response.status == 'connected') {
                    this.props.connected = true;
                } else {
                    this.props.connected = false;
                }
            });
        }
        if (this.props.isOnHeroku && this.props.connected || !this.props.isOnHeroku) {
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
                <div className="main h-100 d-flex flex-column">
                    <Header />
                    <div className="container-fluid d-flex flex-fill">
                        {pageContent}
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;

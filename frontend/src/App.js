import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import Header from './components/Header';

const VK = window.VK;

class App extends Component {

    render() {
        let pageContent;
        let auth_response;

        if (this.props.isInProduction) {
            VK.init({ apiId: 7154329 });
             VK.Auth.getLoginStatus((resp) => {
                auth_response = resp;
            });
            this.props = auth_response.status === 'connected';
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

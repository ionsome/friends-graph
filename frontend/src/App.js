import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import Header from './components/Header';

const VK = window.VK;

class App extends Component {

    componentDidMount() {
        if (this.props.isInProduction) {
            new Promise((resolve) =>{
                VK.init({ apiId: 7154329 });
                VK.Auth.getLoginStatus((response) => {
                    resolve(response);
                })
            }).then((response) => this.setState({vk_state: response}));
        }
      }
    
    render() {
        let pageContent;
        if (this.state.vk_state && this.state.vk_state.status === 'connected') this.props.isAuthorized = true;

        if ((this.props.isInProduction && this.props.isAuthorized) || !this.props.isInProduction) {
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

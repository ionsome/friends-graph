import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import NavBar from './components/NavBar';

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <NavBar/>
                    <Route
                        exact path="/"
                        render={(props) => <MainPage {...props} />}/>
                    <Route
                        path="/auth"
                        render={(props) => <AuthPage {...props} />}/>
                </div>
            </Router>
        );
    }
}

export default App;

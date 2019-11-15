import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar';

class App extends Component {

    render() {
        return (
            <div className="main h-100 d-flex flex-column">
                <Router>
                    <Navbar/>
                    <div className="container-fluid d-flex flex-fill">
                        <Route
                            exact path="/"
                            render={(props) => <MainPage {...props} />}/>
                        <Route
                            path="/auth"
                            render={(props) => <AuthPage {...props} />}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;

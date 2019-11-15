import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import Header from './components/Header';

class App extends Component {

    render() {
        return (
            <Router>
                <div className="main h-100 d-flex flex-column">
                    <Header/>
                    <div className="container-fluid d-flex flex-fill">
                        <Route
                            exact path="/"
                            render={(props) => <MainPage {...props} />}/>
                        <Route
                            path="/auth"
                            render={(props) => <AuthPage {...props} />}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;

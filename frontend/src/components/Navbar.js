import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    Friends Graph
                </a>
                <button className="btn btn-primary" type="submit">Log out</button>
            </nav>
        );
    }
}

export default withRouter(Navbar);

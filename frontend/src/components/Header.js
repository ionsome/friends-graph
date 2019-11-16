import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap'
import logo from '../res/logo.svg';

class Header extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top mr-2"/>
                    Friends Graph
                </Navbar.Brand>
                <Button variant="primary" className="ml-auto">Log out</Button>
            </Navbar>
        );
    }
}

export default withRouter(Header);

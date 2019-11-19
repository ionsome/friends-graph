import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap'
import logo from '../res/logo.svg';
import hide from '../res/hide.svg'

class Header extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top mr-2" />
                    Friends Graph
                </Navbar.Brand>
                <img alt="" src={hide} width="30" height="30" className="d-inline-block align-top ml-auto" />
            </Navbar>
        );
    }
}

export default Header;

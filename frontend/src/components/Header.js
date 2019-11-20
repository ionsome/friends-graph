import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap'
import logo from '../res/logo.svg';
import hide from '../res/hide.svg'

class Header extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark" className="p-2 m-0 w-100 d-flex justify-content-between">
                <img alt="" src={logo} width="30" height="30" />
                <Navbar.Brand>
                    Friends Graph
                </Navbar.Brand>
                <img alt="" src={hide} width="30" height="30" />
            </Navbar>
        );
    }
}

export default Header;

import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap'
import logo from '../res/logo.svg';

const VK = window.VK;

class Header extends Component {

    logoutButtonClickHandler = () => {
        VK.Auth.logout();
        window.location.href = '/';
    };

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top mr-2" />
                    Friends Graph
                </Navbar.Brand>
                <Button variant="primary" className="ml-auto" onClick={this.logoutButtonClickHandler}>Log out</Button>
            </Navbar>
        );
    }
}

export default Header;

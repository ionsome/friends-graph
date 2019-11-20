import React, { Component } from 'react';
import {Button, Card, FormControl } from "react-bootstrap";
import ListView from "./ListView";
import exit from "../res/exit.svg"
import logo from "../res/logo.svg";
import hide from "../res/hide.svg";

const VK = window.VK;

const showWidth = 280;
const hideWidth = 57;

class Sidebar extends Component {
    state = { width: showWidth };

    logoutButtonClickHandler = () => {
        VK.Auth.logout(() =>
            window.location.reload(true));
    };

    hideButtonClickHandler = () => {
        this.setState({ width: hideWidth });
    };

    showButtonClickHandler = () => {
        this.setState({ width: showWidth });
    };

    render() {
        return (
            <div className="d-flex flex-fill">
                <Card bg="light" className="border-0" style={{width: this.state.width, transition: "0.5s"}}>
                    <Card.Header id="sidebar-header" className="d-flex p-1 overflow-hidden">
                        <Button onClick={this.showButtonClickHandler} variant="sidebar-dark" className="mr-1">
                            <img  alt="show" src={logo} width="30" height="30"/>
                        </Button>
                        <h5 id="header-text" className="text-nowrap">Friends Graph</h5>
                        <Button onClick={this.hideButtonClickHandler} variant="sidebar-dark" className="ml-auto">
                            <img alt="hide" src={hide} width="30" height="30" className="overflow-hidden"/>
                        </Button>
                    </Card.Header>
                    <FormControl className="m-2 w-auto" type="search" placeholder="Search" aria-label="Search" />
                    <Card.Body className="p-0">
                        <ListView />
                    </Card.Body>
                    <Card.Footer id="sidebar-footer" className="d-flex p-0">
                        <Button onClick={this.logoutButtonClickHandler} variant="sidebar-light" className="ml-auto">
                            <img alt="exit" src={exit} width="30" height="30"/>
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

export default Sidebar;

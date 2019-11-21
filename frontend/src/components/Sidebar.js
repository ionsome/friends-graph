import React, { Component } from 'react';
import { Button, Card, FormControl } from "react-bootstrap";
import ListView from "./ListView";
import exit from "../res/exit.svg"
import logo from "../res/logo.svg";
import hide from "../res/hide.svg";
import search from "../res/search.svg"

const VK = window.VK;

const showWidth = 280;
const hideWidth = 57;

class Sidebar extends Component {
    state = { collapsed: true };

    logoutButtonClickHandler = () => {
        VK.Auth.logout(() => this.props.changeIsAuthorized());
    };

    hideButtonClickHandler = () => {
        this.setState({ collapsed: true });
    };

    showButtonClickHandler = () => {
        this.setState({ collapsed: false });
    };

    render() {
        return (
            <div className="d-flex flex-fill">
                <Card bg="light" className="border-left-0 border-top-0 border-bottom-0"
                      style={{width: this.state.collapsed ? hideWidth : showWidth, transition: "0.5s"}}>
                    <Card.Header id="sidebar-header" className="d-flex p-0 overflow-hidden" style={{borderRadius: 0}}>
                        <Button onClick={this.showButtonClickHandler} variant="sidebar-dark" className="mr-1">
                            <img  alt="show" src={logo} width="30" height="30"/>
                        </Button>
                        <h5 id="header-text" className="text-nowrap">Friends Graph</h5>
                        <Button onClick={this.hideButtonClickHandler} variant="sidebar-dark" className="ml-auto">
                            <img alt="hide" src={hide} width="30" height="30" className="overflow-hidden"/>
                        </Button>
                    </Card.Header>
                    {this.state.collapsed ?
                        <Button onClick={this.showButtonClickHandler} variant="sidebar-light">
                            <img alt="search" src={search} width="30" height="30"/>
                        </Button> :
                        <FormControl className="m-2 w-auto" type="search" placeholder="Search" aria-label="Search"/> }
                    <Card.Body className="p-0">
                        <ListView />
                    </Card.Body>
                    <Card.Footer id="sidebar-footer" className="d-flex p-0" style={{borderRadius: 0}}>
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

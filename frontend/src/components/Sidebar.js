import React, { Component } from 'react';
import { Button, Card, FormControl } from "react-bootstrap";
import ListView from "./ListView";
import Header from "./Header";

const VK = window.VK;

class Sidebar extends Component {

    logoutButtonClickHandler = () => {
        VK.Auth.logout(() =>
            window.location.reload(true));
    };

    render() {
        return (
            <Card bg="light" className="border-0 d-flex flex-fill" style={{width: "300px"}}>
                <Header />
                <FormControl className="m-2 w-auto" type="search" placeholder="Search" aria-label="Search" />
                <ListView />
                <Card.Footer className="d-flex">
                    <Button className="ml-auto" onClick={this.logoutButtonClickHandler}>Log out</Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default Sidebar;

import React, { Component } from 'react';
import {Button, Card, FormControl, Navbar} from "react-bootstrap";
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
            <div className="d-flex flex-fill">
                <Card bg="light" className="border-left-0 border-top-0 border-bottom-0" style={{ width: "280px" }}>
                    <Header/>
                    <FormControl className="m-2 w-auto" type="search" placeholder="Search" aria-label="Search" />
                    <ListView />
                    <Card.Footer className="d-flex p-2">
                        <Button className="ml-auto" onClick={this.logoutButtonClickHandler}>Log out</Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

export default Sidebar;

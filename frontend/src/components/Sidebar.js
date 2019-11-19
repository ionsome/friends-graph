import React, { Component } from 'react';
import {Button, Card, FormControl} from "react-bootstrap";
import ListView from "./ListView";
import Header from "./Header";

const VK = window.VK;

class Sidebar extends Component {

    logoutButtonClickHandler = () => {
        VK.Auth.logout();
        window.location.href = '/';
    };

    render() {
        return (
            <div className="d-flex flex-fill">
                <Card bg="light" className="border-left-0 border-top-0 border-bottom-0" style={{width: "300px"}}>
                    <Header/>
                    <FormControl className="m-2 w-auto" type="search" placeholder="Search" aria-label="Search"/>
                    <ListView/>
                    <Card.Footer className="d-flex">
                        <Button className="ml-auto" onClick={this.logoutButtonClickHandler}>Log out</Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

export default Sidebar;

import React, { Component } from 'react';
import { Card, FormControl } from "react-bootstrap";
import ListView from "./ListView";
import Header from "./Header";

class Sidebar extends Component {

    render() {
        return (
            <div className="d-flex flex-fill">
                <Card bg="light">
                    <Header/>
                    <FormControl className="m-2 w-auto" type="search" placeholder="Search" aria-label="Search"/>
                    <ListView/>
                </Card>
            </div>
        );
    }
}

export default Sidebar;

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, FormControl } from "react-bootstrap";
import ListView from "./ListView";

class Sidebar extends Component {

    render() {
        return (
            <div className="d-flex flex-fill">
                <Card bg="light">
                    <FormControl className="m-2 w-auto" type="search" placeholder="Search" aria-label="Search"/>
                    <ListView/>
                </Card>
            </div>
        );
    }
}

export default withRouter(Sidebar);

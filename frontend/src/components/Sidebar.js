import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FormControl } from "react-bootstrap";
import ListView from "./ListView";

class Sidebar extends Component {

    render() {
        return (
            <div className="bg-light border-right">
                <FormControl className="m-2 w-auto" type="search" placeholder="Search" aria-label="Search"/>
                <ListView/>
            </div>
        );
    }
}

export default withRouter(Sidebar);

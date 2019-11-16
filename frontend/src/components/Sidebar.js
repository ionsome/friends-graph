import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {ListGroupItem, FormControl, ListGroup} from "react-bootstrap";

class Sidebar extends Component {

    render() {
        return (
            <div className="bg-light border-right">
                <FormControl className="m-2 w-auto" type="search" placeholder="Search" aria-label="Search"/>
                <ListGroup>
                    <ListGroupItem action={true} bg="light">Test #1</ListGroupItem>
                    <ListGroupItem action={true} bg="light">Test #2</ListGroupItem>
                    <ListGroupItem action={true} bg="light">Test #3</ListGroupItem>
                    <ListGroupItem action={true} bg="light">Test #4</ListGroupItem>
                    <ListGroupItem action={true} bg="light">Test #5</ListGroupItem>
                    <ListGroupItem action={true} bg="light">Test #6</ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}

export default withRouter(Sidebar);

import React, { Component } from 'react';
import { Button, ListGroup } from "react-bootstrap";
import defaultAvatar from "../res/default-avatar.png";

class ListView extends Component {

    render() {
        return (
            <ListGroup id="list-view" className="text-nowrap">
                <ListGroup.Item>
                    <Button onClick={() => {this.props.onItemClick("Content #1")}} variant="sidebar-light" className="text-left w-100">
                        <img alt="photo" src={defaultAvatar} width="30" height="30" className="avatar mr-4"/>
                        Item #1
                    </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button onClick={() => {this.props.onItemClick("Content #2")}} variant="sidebar-light" className="text-left w-100">
                        <img alt="photo" src={defaultAvatar} width="30" height="30" className="avatar mr-4"/>
                        Item #2
                    </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button onClick={() => {this.props.onItemClick("Content #3")}} variant="sidebar-light" className="text-left w-100">
                        <img alt="photo" src={defaultAvatar} width="30" height="30" className="avatar mr-4"/>
                        Item #3
                    </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button onClick={() => {this.props.onItemClick("Content #4")}} variant="sidebar-light" className="text-left w-100">
                        <img alt="photo" src={defaultAvatar} width="30" height="30" className="avatar mr-4"/>
                        Item #4
                    </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button onClick={() => {this.props.onItemClick("Content #5")}} variant="sidebar-light" className="text-left w-100">
                        <img alt="photo" src={defaultAvatar} width="30" height="30" className="avatar mr-4"/>
                        Item #5
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        );
    }
}

export default ListView;

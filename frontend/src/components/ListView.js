import React, { Component } from 'react';
import { ListGroup } from "react-bootstrap";

class ListView extends Component {

    render() {
        return (
            <ListGroup id="list-view" className="text-nowrap">
                <ListGroup.Item action onClick={() => {this.props.onItemClick("Content #1")}}>
                    Item #1
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => {this.props.onItemClick("Content #2")}}>
                    Item #2
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => {this.props.onItemClick("Content #3")}}>
                    Item #3
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => {this.props.onItemClick("Content #4")}}>
                    Item #4
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => {this.props.onItemClick("Content #5")}}>
                    Item #5
                </ListGroup.Item>
            </ListGroup>
        );
    }
}

export default ListView;

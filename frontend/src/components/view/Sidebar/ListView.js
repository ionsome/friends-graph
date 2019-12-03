import React, { Component } from 'react';
import { Button, ListGroup } from "react-bootstrap";
import defaultAvatar from "../../../res/default-avatar.png";
import removeIcon from "../../../res/remove.svg"

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items
        };
    }

    createCard = (card) => {
        return (
            <ListGroup.Item key={card.id} className="d-flex">
                <Button onClick={() => { this.props.onItemClick("id " + card.id); }} variant="sidebar-light" className="text-left">
                    <img alt="" src={card.image ? card.image : defaultAvatar} width="30" height="30" className="avatar mr-4" />
                    {card.label}
                </Button>
                <Button variant="sidebar-light" className="ml-auto">
                    <img alt="remove" src={removeIcon} width="30" height="30"/>
                </Button>
            </ListGroup.Item>
        );
    };

    static getDerivedStateFromProps(props, state) {
        return { items: props.items };
    }

    render() {
        return (
            <ListGroup id="list-view" className="text-nowrap">
                {this.state.items.map(this.createCard)}
            </ListGroup>
        );
    }
}

export default ListView;

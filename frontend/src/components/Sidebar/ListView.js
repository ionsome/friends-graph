import React, { Component } from 'react';
import { Button, ListGroup } from "react-bootstrap";
import defaultAvatar from "../../res/default-avatar.png";

class ListView extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            items: props.items
        };
    }

    createCard = (card) => {
        return (
            <ListGroup.Item key={card.id}>
                <Button onClick={() => { this.props.onItemClick("id " + card.id); }} variant="sidebar-light" className="text-left w-100">
                    <img alt="" src={card.image ? card.image : defaultAvatar} width="30" height="30" className="avatar mr-4" />
                    {card.label}
                </Button>
            </ListGroup.Item>
        );
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

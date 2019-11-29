import React, { Component } from 'react';
import { Button, ListGroup } from "react-bootstrap";
import { users } from "../models/Users";
import defaultAvatar from "../res/default-avatar.png";

class ListView extends Component {


    render() {
        return (
            <ListGroup id="list-view" className="text-nowrap">
                {users.map((card) => {
                    return (
                        <ListGroup.Item>
                            <Button onClick={() => { this.props.onItemClick("id " + card.id); }} variant="sidebar-light" className="text-left w-100">
                                <img alt="" src={defaultAvatar} width="30" height="30" className="avatar mr-4" />
                                {card.label}
                            </Button>
                        </ListGroup.Item>
                    );
                })
                }
                {[1,2,3,4,5].map((card) => {
                    return (
                        <ListGroup.Item>
                            <Button onClick={() => { this.props.onItemClick("Content " + card); }} variant="sidebar-light" className="text-left w-100">
                                <img alt="" src={defaultAvatar} width="30" height="30" className="avatar mr-4" />
                                Item #{card}
                            </Button>
                        </ListGroup.Item>
                    );
                })
                }
            </ListGroup>
        );
    }
}

export default ListView;

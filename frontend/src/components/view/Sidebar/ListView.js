import React, { Component } from "react";
import { Button, ListGroup } from "react-bootstrap";
import defaultAvatar from "../../../res/default-avatar.png";
import removeIcon from "../../../res/remove.svg";
import addIcon from "../../../res/add.svg";

let getDefaultUser = () => {
  return {
    id: 213966324,
    label: "Антон Мизиков",
    color: "",
    image:
      "https://sun1-15.userapi.com/c855320/v855320738/84dfa/vSiD1t5QbHk.jpg?ava=1",
    root: false
  };
};

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items
    };
  }

  createCard = card => {
    return (
      <ListGroup.Item key={card.id} className="d-flex flex-nowrap">
        <Button
          onClick={() => {
            this.props.onItemClick(card);
          }}
          variant="sidebar-light"
          className="text-left flex-fill"
          style={{ width: 54 }}
        >
          <img
            alt=""
            src={card.image ? card.image : defaultAvatar}
            width="30"
            height="30"
            className="avatar mr-4"
          />
          <span>{card.label}</span>
        </Button>
        {card.root ? (
          <Button
            variant="sidebar-light"
            className="ml-auto"
            onClick={() => this.props.removeBtnHandler(card)}
          >
            <img alt="remove" src={removeIcon} width="20" height="20" />
          </Button>
        ) : (
          <Button
            variant="sidebar-light"
            className="ml-auto"
            onClick={() => this.props.addBtnHandler(card)}
          >
            <img alt="add" src={addIcon} width="20" height="20" />
          </Button>
        )}
      </ListGroup.Item>
    );
  };

  static getDerivedStateFromProps(props, state) {
    if (props.items.length > 0) return { items: props.items };
    return {
      items: [getDefaultUser()]
    };
  }

  render() {
    return (
      <ListGroup id="list-view" className="text-nowrap">
        {this.state.items.slice(0, 30).map(this.createCard)}
      </ListGroup>
    );
  }
}

export default ListView;

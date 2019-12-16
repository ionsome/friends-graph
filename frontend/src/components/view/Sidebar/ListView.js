import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { ListViewItem } from "./ListViewItem";


class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items
    };
  }

  // быстрая операция
  removeCard = (card) => {
    this.props.removeBtnHandler(card);
  };

  //  Медленная операция
  addCard = (card) => {
    return this.props.addBtnHandler(card);
    // const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    // card.root = true;
    // return wait(1500);
  };

  static getDerivedStateFromProps(props, state) {
    return props;
  }

  render() {
    return (
      <ListGroup id="list-view" className="text-nowrap">
        {this.state.items.slice(0, 50).map((card) =>
          <ListViewItem
            key={card.id}
            card={card}
            onItemClick={this.props.onItemClick}
            removeCard={(card) => this.removeCard(card)}
            addCard={(card) => this.addCard(card)}
          />
        )
        }
      </ListGroup>
    );
  }
}

export { ListView };

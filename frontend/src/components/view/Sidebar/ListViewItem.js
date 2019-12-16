import React, { Component } from "react";
import { Button, ListGroup } from "react-bootstrap";
import defaultAvatar from "../../../res/default-avatar.png";
import removeIcon from "../../../res/remove.svg";
import addIcon from "../../../res/add.svg";
import loadingIcon from "../../../res/loading.svg";


class ListViewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            img: {
                alt: "add",
                src: addIcon,
                onClick: () => this.onAddClick()
            },
        };
    }

    ItemUserLabel = (props) => (
        <Button
            onClick={() => {
                props.onItemClick(props.card);
            }}
            variant="sidebar-light"
            className="text-left flex-fill"
            style={{ width: 54 }}
        >
            <img
                alt=""
                src={props.card.image ? props.card.image : defaultAvatar}
                width="30"
                height="30"
                className="avatar mr-4"
            />
            <span>{props.card.label}</span>
        </Button>
    );

    ItemBtnLabel = (props) => {
        return <Button
            variant="sidebar-light"
            className="ml-auto"
            onClick={props.onClick}>
            <img
                alt={props.alt}
                src={props.src}
                width="20" height="20"
            />
        </Button>;
    };

    onAddClick = () => {
        this.setState({ isLoading: true });
        this.props.addCard(this.props.card).then(() => {
            this.setState({ isLoading: false });
        });
    };


    onRemoveClick = () => {
        console.log('remove');
        console.log(this.props.card);
        this.props.removeCard(this.props.card);
    };

    render() {
        let buttonProps = {
            alt: "add",
            src: addIcon,
            onClick: this.onAddClick
        };

        if (this.props.card.root) {
            buttonProps = {
                alt: "remove",
                src: removeIcon,
                onClick: this.onRemoveClick
            };
        }

        if (this.state.isLoading) {
            buttonProps = {
                alt: "loading",
                src: loadingIcon,
                onClick: () => { console.log('unavailable') }
            };
        }

        return (<ListGroup.Item className="d-flex flex-nowrap" >
            <this.ItemUserLabel card={this.props.card} onItemClick={() => this.props.onItemClick(this.props.card)} />
            <this.ItemBtnLabel {...buttonProps} />
        </ListGroup.Item >);
    }
}

export { ListViewItem };
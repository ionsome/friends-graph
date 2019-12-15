import React, { Component } from "react";
import { Button, Card, Tab } from "react-bootstrap";
import { ListView } from "./ListView";
import { SearchModule, filterInput } from "./SearchModule";
import { createProfileById } from "../../../api/Friends";

import exitIcon from "../../../res/exit.svg";
import logo from "../../../res/logo.svg";
import hideIcon from "../../../res/hide.svg";

const VK = window.VK;

const showWidth = 280;
const hideWidth = 55;


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      showInfo: false,
      searchLine: "",
      listModel: [],
      info: { id: 0, label: "", image: "", root: false }
    };
  }

  logoutButtonClickHandler = () => {
    VK.Auth.logout(() => this.props.changeIsAuthorized());
  };

  hideButtonClickHandler = () => {
    this.setState({ collapsed: true, showInfo: false });
  };

  showButtonClickHandler = () => {
    this.setState({ collapsed: false });
  };

  backButtonClickHandler = () => {
    this.setState({ showInfo: false });
  };

  itemClickHandler = item => {
    if (this.state.collapsed) {
      this.setState({ collapsed: false });
    } else {
      this.setState({ showInfo: true, info: item });
    }
  };

  itemAddBtnHandler = async (card) => {
    return this.props.addRootUser(card.id);
  };

  itemRemoveBtnHandler = card => {
    this.props.removeUser(card);
  };

  updateSearchLine = (newSearchLine) => {
    this.setState({ searchLine: newSearchLine, shouldListModelUpdate: true });
  }

  static getDerivedStateFromProps(props, state) {
    const delta = {};

    if (state.userList !== props.userList) {
      delta.userList = props.userList;
    }

    if (state.defaultUser !== props.defaultUser) {
      delta.defaultUser = props.defaultUser;
    }

    if (delta.defaultUser || delta.userList) {
      delta.shouldListModelUpdate = true;
      return delta;
    }

    return false;
  }

  componentDidUpdate() {
    if (this.state.shouldListModelUpdate) {
      filterInput(this.state.searchLine,
        this.state.userList,
        this.state.defaultUser
      ).then((res) => {
        this.setState({ listModel: res, shouldListModelUpdate: false });
      });
    }
  }

  componentDidMount() {
    createProfileById(213966324).then(
      (profile) => {
        profile.root = true;
        this.props.addUser(profile)
      }
    );
    // this.props.addUser(
    //   {
    //     "id": 213966324,
    //     "label": "Антон Мизиков",
    //     "color": "",
    //     "image": "https://sun1-15.userapi.com/c855320/v855320738/84dfa/vSiD1t5QbHk.jpg?ava=1",
    //     "root": true
    //   }
    // )
  }

  Header = () => {
    return (
      <>
        <Button
          onClick={this.showButtonClickHandler}
          variant="sidebar-dark"
          className="mr-2"
        >
          <img alt="show" src={logo} width="30" height="30" />
        </Button>
        <h5 id="header-text" className="overflow-hidden text-nowrap">
          Friends Graph
                </h5>
        <div className="overflow-hidden ml-auto">
          <Button onClick={this.hideButtonClickHandler} variant="sidebar-dark">
            <img alt="hide" src={hideIcon} width="30" height="30" />
          </Button>
        </div>
      </>
    );
  };

  SidebarContent = () => {
    return (
      <Tab.Container activeKey={this.state.showInfo ? "infoTab" : "listTab"}>
        <Tab.Content>
          <Tab.Pane eventKey="listTab">
            <this.ListTab />
          </Tab.Pane>
          <Tab.Pane eventKey="infoTab">
            <this.InfoTab />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    );
  };

  InfoTab = () => {
    return (
      <div className="d-flex flex-column">
        <Button
          onClick={this.backButtonClickHandler}
          variant="sidebar-light"
          className="text-nowrap overflow-hidden"
        >
          Back
                </Button>
        <img
          alt="avatar"
          src={this.state.info.image}
          width="100%"
          className="mb-2"
        />
        <p className="ml-2 mb-0">{this.state.info.label}</p>
        <a className="m-2" target="_blank" rel="noopener noreferrer"
          href={"https://vk.com/id" + this.state.info.id}>
          Page
                </a>
        {this.state.info.root ? <></> : (
          <Button
            className="border-top"
            variant="sidebar-light"
            onClick={() => this.itemAddBtnHandler(this.state.info)}
          >
            Add
          </Button>
        )}
        <Button
          className="border-top border-bottom"
          variant="sidebar-light"
          onClick={() => this.itemRemoveBtnHandler(this.state.info)}
        >
          Remove
                </Button>
      </div>
    );
  };

  ListTab = () => {
    return (
      <div className="d-flex flex-column">
        <SearchModule
          updateSearchLine={(line) => this.updateSearchLine(line)}
          collapsed={this.state.collapsed}
          showButtonClickHandler={() => this.showButtonClickHandler()}
          updateListHandler={(list) => this.updateListHandler(list)}
        />
        <ListView
          onItemClick={this.itemClickHandler}
          items={this.state.listModel}
          addBtnHandler={this.itemAddBtnHandler}
          removeBtnHandler={this.itemRemoveBtnHandler}
        />
      </div>
    );
  };


  render() {
    return (
      <div className="d-flex flex-fill vh-100">
        <Card
          bg="light"
          className="border-left-0 border-top-0 border-bottom-0"
          style={{
            width: this.state.collapsed ? hideWidth : showWidth,
            transition: "0.5s"
          }}
        >
          <Card.Header id="sidebar-header" className="d-flex p-0">
            <this.Header />
          </Card.Header>
          <Card.Body id="sidebar-body" className="d-flex flex-column p-0">
            <this.SidebarContent />
          </Card.Body>
          <Card.Footer id="sidebar-footer" className="d-flex p-0">
            <Button
              onClick={this.logoutButtonClickHandler}
              variant="sidebar-light"
              className="ml-auto"
            >
              <img alt="exit" src={exitIcon} width="30" height="30" />
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export { Sidebar };

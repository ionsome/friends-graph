import React, { Component } from "react";
import { Button, Card, FormControl, Tab } from "react-bootstrap";
import ListView from "./ListView";
import exitIcon from "../../../res/exit.svg";
import logo from "../../../res/logo.svg";
import hideIcon from "../../../res/hide.svg";
import searchIcon from "../../../res/search.svg";

const VK = window.VK;

const showWidth = 280;
const hideWidth = 55;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      showInfo: false,
      userList: props.userList,
      listModel: props.userList.filter(user => user.root),
      searchLine: ''
    };
  }

  logoutButtonClickHandler = () => {
    VK.Auth.logout(() => this.props.changeIsAuthorized());
  };

  hideButtonClickHandler = () => {
    this.setState({ collapsed: true, showInfo: false, listModel: this.props.userList.filter(user => user.root) });
  };

  showButtonClickHandler = () => {
    this.setState({ collapsed: false });
  };

  backButtonClickHandler = () => {
    this.setState({ showInfo: false });
  };

  itemClickHandler = item => {
    this.setState({ collapsed: false, showInfo: true, info: item });
  };

  itemAddBtnHandler = card => {
    console.log('add handler');
    console.log(card);
    this.props.addRootUser(card.id);
  };

  itemRemoveBtnHandler = card => {
    console.log('remove handler');
    console.log(card);
    this.props.removeUser(card.id);
  };

  searchInputHandler = event => {
    if (event.target.value === "") {
      this.setState({
        listModel: this.props.userList.filter(user => user.root),
        searchLine: ''
      });
    } else {
      this.setState({
        listModel: this.props.userList.filter(user =>
          user.label.toLowerCase().includes(event.target.value.toLowerCase())
        ),
        searchLine: event.target.value
      });
    }
  };

  static getDerivedStateFromProps(props, state) {
    let delta = {};
    if (props.userList.length !== state.userList.length)
      delta.userList = props.userList;
    if (state.searchLine === '')
      delta.listModel = props.userList.filter(user => user.root);
    return delta;
  }

  render() {
    let header = (
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

    let sidebarContent = (
      <Tab.Container activeKey={this.state.showInfo ? "infoTab" : "listTab"}>
        <Tab.Content>
          <Tab.Pane eventKey="listTab">
            <div className="d-flex flex-column">
              {this.state.collapsed ? (
                <Button
                  onClick={this.showButtonClickHandler}
                  variant="sidebar-light"
                >
                  <img
                    alt="search"
                    src={searchIcon}
                    width="30"
                    height="34"
                    className="mt-1 mb-1"
                  />
                </Button>
              ) : (
                <FormControl
                  onChange={this.searchInputHandler}
                  className="m-2 w-auto"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={this.state.searchLine}
                />
              )}
              <ListView
                onItemClick={this.itemClickHandler}
                items={this.state.listModel}
                addBtnHandler={this.itemAddBtnHandler}
                removeBtnHandler={this.itemRemoveBtnHandler}
              />
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="infoTab">
            <div className="d-flex flex-column">
              <Button
                onClick={this.backButtonClickHandler}
                variant="sidebar-light"
                className="text-nowrap overflow-hidden"
              >
                Back
              </Button>
              <p className="text-nowrap overflow-hidden m-2">
                {this.state.info}
              </p>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    );

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
            {header}
          </Card.Header>
          <Card.Body id="sidebar-body" className="d-flex flex-column p-0">
            {sidebarContent}
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

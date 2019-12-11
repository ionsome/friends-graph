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
      defaultUser: props.defaultUser,
      listModel: [props.defaultUser],
      searchLine: "",
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
    this.setState({ collapsed: false, showInfo: true, info: item });
  };

  itemAddBtnHandler = card => {
    this.props.addRootUser(card.id);
  };

  itemRemoveBtnHandler = card => {
    this.props.removeUser(card);
  };

  searchInputHandler = event => {
    // Если строка пустая, то следует вернуть список рутовых юзеров
    if (event.target.value === "") {
      let newListModel = this.props.userList.filter(user => user.root);
      
      // Если список юзеров пустой, то вернуть дефолтного юзера
      if (newListModel.length === 0){
        newListModel = [this.props.defaultUser];
      }
      this.setState({
        listModel: newListModel,
        searchLine: ""
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
    const delta = {};

    if (props.userList.length !== state.userList.length)
      delta.userList = props.userList;
    
    // Если строка пустая, то следует вернуть список рутовых юзеров
    if (state.searchLine === "" || props.defaultUser !== state.defaultUser)
    {
      delta.listModel = props.userList.filter(user => user.root);
      // Если список юзеров пустой, то вернуть дефолтного юзера
      if (delta.listModel.length === 0){
        delta.listModel = [props.defaultUser];
      }
    }
    return delta;
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
        <a className="m-2" target="_blank" rel="noopener noreferrer" href={"https://vk.com/id" + this.state.info.id}>
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

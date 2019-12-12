import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Sidebar } from "../view/Sidebar";
import { FriendsGraph as Graph } from "../view/Graph";
import { Grapharable } from "../containers/Grapharable";
import { createProfileById } from "../../api/Friends";

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      defaultUser: {
        "id": 0,
        "label": "Not loaded",
        "color": "",
        "image": "https://vk.com/images/camera_200.png?ava=1",
        "root": false
      }
    };
  }

  componentDidMount() {
    createProfileById(213966324).then(
     (profile) => profile && this.setState({ defaultUser: profile })
    );
  }

  render() {
    return (
      <Grapharable>
        {(users, relations, addRootUser, removeUser, bindGraph) => {
          return (
            <div className="main d-flex">
              <Graph
                users={users}
                relations={relations}
                addRootUser={addRootUser}
                bindGraph={bindGraph}
              />
              <Sidebar
                userList={users}
                changeIsAuthorized={this.props.changeIsAuthorized}
                addRootUser={addRootUser}
                removeUser={removeUser}
                defaultUser={this.state.defaultUser}
              />
            </div>
          );
        }}
      </Grapharable>
    );
  }
}

export { MainPage };

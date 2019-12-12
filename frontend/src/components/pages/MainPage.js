import React, { Component } from "react";
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
                changeIsAuthorized={this.props.changeIsAuthorized}
                defaultUser={this.state.defaultUser}
                userList={users}
                addRootUser={addRootUser}
                removeUser={removeUser}
              />
            </div>
          );
        }}
      </Grapharable>
    );
  }
}

export { MainPage };

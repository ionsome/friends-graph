import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Sidebar } from "../view/Sidebar";
import { FriendsGraph as Graph } from "../view/Graph";
import { Grapharable } from "../containers/Grapharable";

class MainPage extends Component {
  render() {
    return (
      <Grapharable>
        {(users, relations, createProfileById, addRootUser, removeUser, bindGraph) => {
          let defaultUser = createProfileById(213966324);
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
                defaultUser={defaultUser}
              />
            </div>
          );
        }}
      </Grapharable>
    );
  }
}

export default withRouter(MainPage);

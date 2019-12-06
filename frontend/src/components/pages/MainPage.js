import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Sidebar } from "../view/Sidebar";
import { FriendsGraph as Graph } from "../view/Graph";
import { Userable } from "../containers/Userable";

class MainPage extends Component {
  render() {
    return (
      <Userable>
        {(users, relations, addRootUser, bindGraph, addUser) => (
          <div className="main d-flex">
            <Graph
              users={users}
              relations={relations}
              addRootUser={(id, network) => addRootUser(id, network)}
              bindGraph={bindGraph}
              addUser={addUser}
            />
            <Sidebar
              userList={users}
              changeIsAuthorized={this.props.changeIsAuthorized}
              addRootUser={addRootUser}
            />
          </div>
        )}
      </Userable>
    );
  }
}

export default withRouter(MainPage);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Sidebar } from "../view/Sidebar";
import { FriendsGraph as Graph } from "../view/Graph";
import { Grapharable } from "../containers/Grapharable";

class MainPage extends Component {
  render() {
    return (
      <Grapharable>
        {(users, relations, addRootUser, addUser, removeUser, bindGraph) => (
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
              removeUser={removeUser}
            />
          </div>
        )}
      </Grapharable>
    );
  }
}

export default withRouter(MainPage);

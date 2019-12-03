import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Sidebar } from "../view/Sidebar";
import { FriendsGraph as Graph } from "../view/Graph";
import { Userable } from '../containers/Userable';


class MainPage extends Component {

    render() {
        return <Userable>
            {(users, addRootUser, addUser) => (
                <div className="main d-flex">
                    <Graph users={users} addUser={addUser} addRootUser={(id, network) => addRootUser(id, network)} />
                    <Sidebar userList={users} changeIsAuthorized={this.props.changeIsAuthorized} />
                </div>)
            }
            </Userable>;
    }
}

export default withRouter(MainPage);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Sidebar } from "../Sidebar";
import { FriendsGraph as Graph } from "../Graph";
import { users } from '../../containers/Users';

class MainPage extends Component {

    render() {
        return (
            <div className="main d-flex">
                <Graph />
                <Sidebar userList={ users } changeIsAuthorized={this.props.changeIsAuthorized} />
            </div>
        );
    }
}

export default withRouter(MainPage);

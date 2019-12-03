import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import { FriendsGraph as Graph } from "../components/Graph";

class MainPage extends Component {

    render() {
        return (
            <div className="main d-flex">
                <Graph />
                <Sidebar changeIsAuthorized={this.props.changeIsAuthorized}/>
            </div>
        );
    }
}

export default withRouter(MainPage);

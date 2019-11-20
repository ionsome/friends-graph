import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import FriendsGraph from "../components/FriendsGraph";

class MainPage extends Component {

    render() {
        return (
            <div className="main d-flex">
                <Sidebar unauthorize={this.props.unauthorize}/>
                <FriendsGraph />
            </div>
        );
    }
}

export default withRouter(MainPage);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import FriendsGraph from "../components/FriendsGraph";

class MainPage extends Component {

    render() {
        return (
            <div className="main h-100 d-flex flex-column">
                <FriendsGraph/>
                <Sidebar/>
            </div>
        );
    }
}

export default withRouter(MainPage);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Sidebar from "../components/Sidebar";

class MainPage extends Component {

    render() {
        return (
            <div className="row flex-fill">
                <Sidebar/>
                <div>
                    <p>Hello World!</p>
                </div>
            </div>
        );
    }
}

export default withRouter(MainPage);

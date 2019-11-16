import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import { Row } from "react-bootstrap";

class MainPage extends Component {

    render() {
        return (
            <Row className="flex-fill">
                <Sidebar/>
                <div>
                    <p>Page content</p>
                </div>
            </Row>
        );
    }
}

export default withRouter(MainPage);

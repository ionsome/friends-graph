import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Sidebar extends Component {

    render() {
        return (
            <div className="bg-light border-right">
                <input className="form-control m-2 w-auto" type="search" placeholder="Search" aria-label="Search"/>
                <a href="#" className="list-group-item list-group-item-action bg-light">Test #1</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">Test #2</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">Test #3</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">Test #4</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">Test #5</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">Test #6</a>
            </div>
        );
    }
}

export default withRouter(Sidebar);

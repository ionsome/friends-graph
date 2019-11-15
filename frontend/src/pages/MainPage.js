import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class MainPage extends Component {

    render() {
        return (
            <div>
                <p>Hello World!</p>
            </div>
        );
    }
}

export default withRouter(MainPage);

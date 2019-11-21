import React, { Component } from 'react';
import Graph from "react-graph-vis";

import FriendsApi from '../api/Friends'


const graph = {
    nodes: [
        { id: 9, label: "Node 1", color: "#e04141" },
        { id: 2, label: "Node 2", color: "#e09c41" },
        { id: 3, label: "Node 3", color: "#e0df41" },
        { id: 4, label: "Node 4", color: "#7be041" },
        //{ id: 5, label: "Node 5", color: "#41e0c9"},
        { id: 6, label: "Node 6", color: "#335ae0" },
        { id: 7, label: "Node 7", color: "#e05fda" },
        { id: 8, label: "Node 8", color: "#98c2e0" }
    ],
    edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 4 },
        { from: 3, to: 6 },
        { from: 3, to: 7 },
        { from: 4, to: 8 }]
};


const options = {
    autoResize: true,
    layout: {
        hierarchical: false
    },
    nodes: {
        shape: "dot"
    },
    edges: {
        color: "#000000",
        arrows: {
            to: {
                enabled: false
            }
        },
        smooth: {
            enabled: true
        }
    }
};

const events = {
    select: function (event) {
        let { nodes, edges } = event;
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
    }
};

class FriendsGraph extends Component {

    test_api() {
        console.log(FriendsApi.friends_get(5));
    }

    render() {
        return (
            <div className="vw-100 vh-100 position-fixed">
                <Graph graph={graph} options={options} events={events}/>
            </div>
        );
    }
}

export default FriendsGraph;

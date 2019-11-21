import React, { Component } from 'react';
import GraphVis from "react-graph-vis";

import FriendsApi from '../api/Friends'


const nodes = [
    { id: 9, label: "Node 1", color: "#e04141" },
    { id: 2, label: "Node 2", color: "#e09c41" },
    { id: 3, label: "Node 3", color: "#e0df41" },
    { id: 4, label: "Node 4", color: "#7be041" },
    { id: 6, label: "Node 6", color: "#335ae0" },
    { id: 7, label: "Node 7", color: "#e05fda" },
    { id: 8, label: "Node 8", color: "#98c2e0" }
]

const options = {
    interaction: { hover: true },
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
    },
    manipulation: {
        enabled: true,
        initiallyActive: true,
        addNode: function (nodeData, callback) {
            nodeData = {
                value: Math.floor((Math.random() * 1000) + 1),
            };
            callback(nodeData);
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
    },
};

class FriendsGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graphVis: {
                nodes: nodes,
                edges: [
                    { from: 1, to: 2 },
                    { from: 1, to: 3 },
                    { from: 2, to: 4 },
                    { from: 2, to: 5 },
                    { from: 3, to: 4 },
                    { from: 3, to: 6 },
                    { from: 3, to: 7 },
                    { from: 4, to: 8 }]
            },
            events: events
        };

        this.initNetworkInstance = this.initNetworkInstance.bind(this);
    }

    initNetworkInstance(networkInstance) {
        this.graphIntance = networkInstance;
    }

    test_api() {
        console.log(FriendsApi.friends_get(5));
        const newCameraPosition = {
            position: { x: Math.floor((Math.random() * 250)), y: Math.floor((Math.random() * 250)) },
            scale: 0.85,
            offset: { x: 0, y: 0 },
            animation: { duration: 1000, easingFunction: "easeInOutQuad" }
        };
        this.graphIntance.moveTo(newCameraPosition);
        this.graphIntance.addNodeMode();
    }

    render() {
        return (
            <div className="vw-100 vh-100 position-fixed">
                <button className="float-right" onClick={this.test_api.bind(this)}>test</button>
                <GraphVis graph={this.state.graphVis}
                    options={options}
                    events={events}
                    getNetwork={this.initNetworkInstance} />
            </div>
        );
    }
}

export default FriendsGraph;

import React, { Component } from 'react';
import GraphVis from "react-graph-vis";
import {addRootUser} from '../models/Users'

const nodes = [
    { id: 1, label: "Node 1", color: "#e04141" },
    { id: 2, label: "Node 2", color: "#e09c41" },
    { id: 3, label: "Node 3", color: "#e0df41" },
    { id: 4, label: "Node 4", color: "#7be041" },
    { id: 6, label: "Node 6", color: "#335ae0" },
    { id: 7, label: "Node 7", color: "#e05fda" },
    { id: 8, label: "Node 8", color: "#98c2e0" }
];

const edges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 4 },
    { from: 3, to: 6 },
    { from: 3, to: 7 },
    { from: 4, to: 8 }
];

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
                edges: edges,
            },
            events: events
        };

        this.initNetworkInstance = this.initNetworkInstance.bind(this);
        this.initNodesInstance = this.initNodesInstance.bind(this);
        this.initEdgesInstance = this.initEdgesInstance.bind(this);
    }

    initNetworkInstance(networkInstance) {
        this.networkIntance = networkInstance;
    }

    initNodesInstance(nodesInstance) {
        this.nodesIntance = nodesInstance;
    }

    initEdgesInstance(edgesInstance) {
        this.edgesInstance = edgesInstance;
    }

    test_api() {
        this.addNodes({ label: "Maxim" });
        this.addEdges([{ from: 4, to: 6 }]);
        addRootUser(7);
    }

    addNodes(nodes) {
        this.nodesIntance.add(nodes);
    }

    addEdges(edges) {
        this.edgesInstance.add(edges);   
    }

    render() {
        return (
            <div className="vw-100 vh-100 position-fixed">
                <button className="float-right" onClick={this.test_api.bind(this)}>test</button>
                <GraphVis graph={this.state.graphVis}
                    options={options}
                    events={events}
                    getNetwork={this.initNetworkInstance}
                    getNodes={this.initNodesInstance}
                    getEdges={this.initEdgesInstance} />
            </div>
        );
    }
}

export {FriendsGraph};

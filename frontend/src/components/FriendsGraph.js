import React, { Component } from 'react';
import GraphVis from "react-graph-vis";
import { addRootUser } from '../models/Users'

const nodes = [
    { id: 1, label: "Node 1", image: '' },
    { id: 2, label: "Node 2", image: '' },
    { id: 3, label: "Node 3", image: '' },
];

const edges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
];

const options = {
    interaction: { hover: true },
    autoResize: true,
    layout: {
        hierarchical: false
    },
    nodes: {
        shape: 'circularImage',
        label: 'useImageSize',
        brokenImage: 'https://vk.com/images/camera_200.png?ava=1',
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
        this.addNodes({ label: "Maxim", image:'https://sun1-28.userapi.com/c850424/v850424298/65692/uCP5eFwQCBI.jpg?ava=2'});
        this.addEdges([{ from: 4, to: 6 }]);
        addRootUser(97992816, this);
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

import React, { Component } from "react";
import GraphVis from "react-graph-vis";

const options = {
  interaction: { hover: true },
  autoResize: true,
  layout: {
    hierarchical: false
  },
  nodes: {
    shape: "circularImage",
    label: "useImageSize",
    brokenImage: "https://vk.com/images/camera_200.png?ava=1",
    color: {
      border: "#9b9b9b",
      highlight: "#00b2ff",
      hover: "#00b2ff"
    }
  },
  edges: {
    color: {
      color: "#9b9b9b",
      highlight: "#00b2ff",
      hover: "#00b2ff"
    },
    hoverWidth: 2,
    selectionWidth: 2,
    arrows: {
      to: {
        enabled: false
      }
    },
    smooth: {
      enabled: false
    }
  },
  physics: {
    enabled: true,
    solver: "repulsion",
    repulsion: {
      nodeDistance: 1000,
      springLength: 250,
      springConstant: 0.03
    }
  }
};

class FriendsGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphVis: {
        nodes: this.props.users,
        edges: this.props.relations
      },
      events: {
        select: event => {
          let { nodes, edges } = event;
          console.log("Selected nodes:");
          console.log(nodes);
          console.log("Selected edges:");
          console.log(edges);
        },
        doubleClick: event => {
          let { nodes } = event;
          console.log("Doubleclick");
          console.log(nodes);
          if (nodes) {
            this.props.addRootUser(nodes[0], this);
          }
        }
      }
    };
    this.initNetworkInstance = this.initNetworkInstance.bind(this);
    this.initNodesInstance = this.initNodesInstance.bind(this);
    this.initEdgesInstance = this.initEdgesInstance.bind(this);

    this.props.bindGraph(this);
  }

  initNetworkInstance(networkInstance) {
    this.networkIntance = networkInstance;
  }

  initNodesInstance(nodesInstance) {
    this.nodesInstance = nodesInstance;
  }

  initEdgesInstance(edgesInstance) {
    this.edgesInstance = edgesInstance;
  }

  test_api() {
    this.props.addRootUser(213966324);
    // this.props.addUser(
    //   {
    //     id: 30042234,
    //     label: "Алексей Русалков",
    //     color: "",
    //     image:
    //       "https://sun1-17.userapi.com/8R582ps0d9RxUwDsiMy8GUrg3hNKfXTbOWIqpQ/bODgNmoNGys.jpg?ava=1",
    //     root: true
    //   },
    //   this
    // );
  }

  addNodes(nodes) {
    console.log(this.nodesInstance);
    console.log(this.edgesInstance);
    this.nodesInstance.add(nodes);
  }

  addEdges(edges) {
    this.edgesInstance.add(edges);
  }

  render() {
    return (
      <div className="vw-100 vh-100 position-fixed">
        <button className="float-right" onClick={this.test_api.bind(this)}>
          test
        </button>
        <GraphVis
          graph={this.state.graphVis}
          options={options}
          events={this.state.events}
          getNetwork={this.initNetworkInstance}
          getNodes={this.initNodesInstance}
          getEdges={this.initEdgesInstance}
        />
      </div>
    );
  }
}

export { FriendsGraph };

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Graph } from "react-d3-graph";

const data = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }, { id: "Max" }, { id: "Bob"}],
    links: [{ source: "Harry", target: "Sally" },
        { source: "Max", target: "Alice" },
        { source: "Sally", target: "Max"},
        { source: "Max", target: "Bob"},
        { source: "Sally", target: "Max"}],
};

const onClickGraph = function() {
    console.log(`Clicked the graph background`);
};

const onClickNode = function(nodeId) {
    console.log(`Clicked node ${nodeId}`);
};

const onRightClickNode = function(event, nodeId) {
    console.log(`Right clicked node ${nodeId}`);
};

const onMouseOverNode = function(nodeId) {
    console.log(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function(nodeId) {
    console.log(`Mouse out node ${nodeId}`);
};

const onClickLink = function(source, target) {
    console.log(`Clicked link between ${source} and ${target}`);
};

const onRightClickLink = function(event, source, target) {
    console.log(`Right clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function(source, target) {
    console.log(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function(source, target) {
    console.log(`Mouse out link between ${source} and ${target}`);
};

const onNodePositionChange = function(nodeId, x, y) {
    console.log(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
};

class FriendsGraph extends Component {

    render() {
        let config = {
            nodeHighlightBehavior: true,
            node: {
                color: "lightgreen",
                size: 500,
                fontSize: 18,
                highlightFontSize: 20,
                highlightStrokeColor: "blue",
            },
            link: {
                highlightColor: "lightblue",
            },
        };

        config = Object.assign({}, config, {
            height: window.innerHeight,
            width: window.innerWidth,
        });

        return (
            <div className="position-fixed">
                <Graph
                    id="friends-graph"
                    data={data}
                    config={config}
                    onClickNode={onClickNode}
                    onRightClickNode={onRightClickNode}
                    onClickGraph={onClickGraph}
                    onClickLink={onClickLink}
                    onRightClickLink={onRightClickLink}
                    onMouseOverNode={onMouseOverNode}
                    onMouseOutNode={onMouseOutNode}
                    onMouseOverLink={onMouseOverLink}
                    onMouseOutLink={onMouseOutLink}
                    onNodePositionChange={onNodePositionChange}/>
            </div>
        );
    }
}

export default withRouter(FriendsGraph);

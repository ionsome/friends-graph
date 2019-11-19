import React, { Component } from 'react';
import { Accordion, Card } from "react-bootstrap";

class ListView extends Component {

    render() {
        return (
            <Accordion defaultActiveKey="-1" className="mb-auto">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Item #1
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>Content #1</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Item #2
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Content #2</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                        Item #3
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>Content #3</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                        Item #4
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>Content #4</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="4">
                        Item #5
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                        <Card.Body>Content #5</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
}

export default ListView;

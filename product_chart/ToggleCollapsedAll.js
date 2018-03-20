import React, {Component} from 'react';
import {Row, Button} from 'react-bootstrap';

class ToggleCollapsedAll extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Row>
                {
                    this.props.isCollapsed ?
                        <Button onClick={this.props.setExpandAll}>Expand All</Button>
                    :
                        <Button onClick={this.props.setCollapseAll}>Collapse All</Button>
                }
            </Row>
        );
    }
}

module.exports = ToggleCollapsedAll;

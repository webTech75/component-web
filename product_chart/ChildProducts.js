import React, {Component} from 'react';
import accounting from "accounting";
import {Grid, Row, Col, Button, Table, HelpBlock} from 'react-bootstrap';

class ChildProducts extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let child_product_names = this.props.child_product_names;

        return (
            <div className="package-child-products">
                {
                    child_product_names.map((name, i) => {
                        return(
                            <Row key={i}>
                                <Col md={4}>
                                    <span className="p-l20"> {name}</span>
                                </Col>
                                <Col md={8}>
                                </Col>
                            </Row>
                        )
                    })
                }
            </div>
        );
    }
}

module.exports = ChildProducts;

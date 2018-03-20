import React, {Component} from 'react';
import accounting from "accounting";
import {Grid, Row, Col, Button, Table, HelpBlock} from 'react-bootstrap';

class Personalizations extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.product.personalizations) {
            return '';
        }
        let pers = this.props.product.personalizations;

        return (
            <div className="namestamps">
                {
                    pers.eyearbook && pers.eyearbook[0] ?
                        <Row key={i}>
                            <Col md={4}>
                                <span className="p-l20"> eYearbook {pers.eyearbook[0].required ? "" : " (optional)"}</span>
                            </Col>
                            <Col md={6}>
                                <Col md={3}>
                                </Col>
                                <Col md={3}>
                                    <span> { pers.eyearbook[0].required ? "" : `$${pers.eyearbook[0].price}` } </span>
                                </Col>
                                <Col md={6}>
                                </Col>
                            </Col>
                            <Col md={2}>
                                <Col md={this.props.readonly ? 12 : 7}>
                                </Col>
                                {this.props.readonly ? '' :
                                    <Col md={5}>
                                    </Col>
                                }
                            </Col>
                        </Row>
                    :
                        ""
                }

                {
                    pers.lines.map((line, i) => {
                        return(
                            <Row key={i}>
                                <Col md={4}>
                                    <span className="p-l20"> Personalization Line {i + 1} {line.required ? "" : " (optional)"}</span>
                                </Col>
                                <Col md={6}>
                                    <Col md={3}>
                                    </Col>
                                    <Col md={3}>
                                        { line.required ? "" : `$${accounting.formatNumber(line.price, 2)}` }
                                    </Col>
                                    <Col md={6}>
                                    </Col>
                                </Col>
                                <Col md={2}>
                                    <Col md={this.props.readonly ? 12 : 7}>
                                    </Col>
                                    {this.props.readonly ? '' :
                                        <Col md={5}>
                                        </Col>
                                    }
                                </Col>
                            </Row>
                        )
                    })
               }


                {
                    pers.icons.map((icon, i) => {
                        return(
                            <Row key={i}>
                                <Col md={4}>
                                    <span className="p-l20"> Icon {i + 1} {icon.required ? "" : " (optional)"}</span>
                                </Col>
                                <Col md={6}>
                                    <Col md={3}>
                                    </Col>
                                    <Col md={3}>
                                        {icon.required ? "" : `$${accounting.formatNumber(icon.price, 2)}` }
                                    </Col>
                                    <Col md={6}>
                                    </Col>
                                </Col>
                                <Col md={2}>
                                    <Col md={this.props.readonly ? 12 : 7}>
                                    </Col>
                                    {this.props.readonly ? '' :
                                        <Col md={5}>
                                        </Col>
                                    }
                                </Col>
                            </Row>
                        )
                    })
                }
            </div>
        );
    }
}

module.exports = Personalizations;

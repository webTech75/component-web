import React, {Component} from 'react';
import accounting from "accounting";
import {formattedDate, translateGrades} from "./helper.js";
import {Grid, Row, Col, Button, Table, HelpBlock} from 'react-bootstrap';

class PricingTiers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.tiers) {
            return '';
        }

        const tiers_are_grouped = this.props.gradesIsText ? this.props.gradesIsText : false;

        return (
            <div className="tiers">
                {
                    this.props.tiers.map((tier, i) => {
                        const grades_is_text = this.props.gradesIsText ? this.props.gradesIsText : false;
                        let grade_names = "";
                        let date = "";
                        if (grades_is_text) {
                            date = formattedDate(tier.start_date);
                        }
                        else {
                            date = formattedDate(tier.start_date) + " - " + formattedDate(tier.end_date);
                        }
                        if (tiers_are_grouped) {
                            grade_names = tier.grades;
                            tier.consumer_price = accounting.formatNumber(tier.price, 2);
                        }
                        else {
                            const salesTaxRate = this.props.priceIncludesTaxes ? this.props.salesTaxRate : 0;
                            tier.formatTierGroup(salesTaxRate);
                            if (tier.grades) {
                                grade_names = translateGrades(tier.grades, this.props.grades);
                            }
                        }
                        if (grade_names === this.props.product_grade_names) {
                            grade_names = "ALL";
                        }
                        return(
                            <Row key={i} className={(tier.active && this.props.isYearBook) || (tier.active && !this.props.isCollapsed) ? "active-tier" : ""}>
                                <Col md={4}>
                                    <span className="p-l40"> { this.props.isYearBook || !this.props.isCollapsed? "Tiered Pricing" : "" } </span>
                                </Col>
                                <Col md={6}>
                                    <Col md={3}>
                                        <span> {grade_names} </span>
                                    </Col>
                                    <Col md={3}>
                                        ${tier.consumer_price}
                                    </Col>
                                    <Col className="p-l30" md={6}>
                                        {date}
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

module.exports = PricingTiers;

import React, {Component} from 'react';
import accounting from "accounting";
import {Grid, Row, Col, Button, Table, HelpBlock} from 'react-bootstrap';
import ToggleCollapsedAll from "./ToggleCollapsedAll.js";
import Products from "./Products.js";
import {translateTrimSize} from "./helper.js";

class ProductChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCollapsed : true
        }

        this.categorizedProductList = {};
        this.categoryOrder = [
            'Yearbook',
            'Accessories',
            'Commercial Ads',
            'Student Ads',
            'Ad Space',
            'Package',
            'Personalization',
            'Custom'
        ];
        this.nonTaxables = [
            'Commercial Ads',
            'Student Ads',
            'Ad Space',
        ];
        this.defaultPersonalizations = {};

        this.handleCategories = this.handleCategories.bind(this);
        this.populateProductsList = this.populateProductsList.bind(this);

        this.setExpandAll = this.setExpandAll.bind(this);
        this.setCollapseAll = this.setCollapseAll.bind(this);
    }

    static get defaultProps() {
        return {readonly: false};
    }

    componentWillMount() {
        this.populateProductsList(this.props.products);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.products != nextProps.products) {
            this.populateProductsList(nextProps.products);
        }
    }

    populateProductsList(products) {
        this.categorizedProductList = {};
        products.map((item) => {
            let category = this.props.productCategories[ item.product_category_id ].product_category_name;

            if(this.categorizedProductList[category]) {
                this.categorizedProductList[category].push(item);
            }
            else {
                this.categorizedProductList[category] = [item];
            }
        });
    }

    setCollapseAll() {
        this.setState({isCollapsed: true});
    }

    setExpandAll() {
        this.setState({isCollapsed: false});
    }

    handleCategories() {
        return (
            <div className="categories">
                {
                    this.categoryOrder.map((category_name, i) => {
                        if(this.categorizedProductList[category_name]) {
                            if(category_name === 'Yearbook') {
                                let yb = this.defaultPersonalizations;
                                if (this.categorizedProductList[ category_name ].length > 0) {
                                    yb = this.categorizedProductList[ category_name ][ 0 ];
                                }
                                const personalization_name = yb.personalization_type ? ", " + yb.personalization_type.book_personalization_type_value : "";
                                const book_cover_name = yb.cover_type ? ", " + yb.cover_type.book_cover_value : "";

                                return (
                                    <div id={"category-"+category_name} className={"category-"+category_name} key={i}>
                                        <Row>
                                            <Col md={4} className="category-name">
                                                <span> Yearbooks and Personalizations </span>
                                            </Col>
                                            <Col>
                                                <HelpBlock> <em> (Trim Size {translateTrimSize(this.props.trimSize)}{book_cover_name}{personalization_name}) </em> </HelpBlock>
                                            </Col>
                                        </Row>
                                        {
                                            <Products
                                                {...this.props}
                                                isYearBook={true}
                                                storeProducts={this.props.products}
                                                products={this.categorizedProductList[category_name]}
                                            />
                                        }
                                    </div>
                                )
                            }
                            return (
                                <div id={"category-"+category_name} className={"category-"+category_name} key={i}>
                                    <Row>
                                        <Col md={12} className="category-name">
                                            <span> {category_name} </span>
                                        </Col>
                                    </Row>
                                    {
                                        <Products
                                            {...this.props}
                                            storeProducts={this.props.products}
                                            products={this.categorizedProductList[category_name]}
                                            isCollapsed={this.state.isCollapsed}
                                            isNonTaxable={this.nonTaxables.includes(category_name)}
                                        />
                                    }
                                </div>
                            )
                        }
                    })
                }
            </div>
        );
    }

    render() {
        return (
            <div className="product-enabled">
                <ToggleCollapsedAll isCollapsed={this.state.isCollapsed} setExpandAll={this.setExpandAll} setCollapseAll={this.setCollapseAll} />
                <Row className="products-enabled-headers">
                    <Col md={4}>
                        Product Name
                    </Col>
                    <Col md={6}>
                        <Col md={3}>
                            Grades
                        </Col>
                        <Col md={3}>
                            Product Price
                        </Col>
                        <Col className="p-l30" md={6}>
                            Sales Date
                        </Col>
                    </Col>
                    <Col md={2}>
                        <Col className="p-l30" md={this.props.readonly ? 12 : 7}>
                            Online
                        </Col>
                        {this.props.readonly ? '' :
                            <Col md={5}>
                            </Col>
                        }
                    </Col>
                </Row>
                {this.handleCategories()}
            </div>
        );
    }
}

module.exports = ProductChart;

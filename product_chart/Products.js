import React, {Component} from 'react';
import accounting from "accounting";
import Toggle from "react-bootstrap-toggle";
import {isOnline, formattedDate, translateGrades} from "./helper.js";
import {makeTierGroups, enrichTiers} from '../pricing-tiers';
import PricingTiers from "./PricingTiers.js";
import Personalizations from "./Personalizations.js";
import ChildProducts from "./ChildProducts.js";
import {Grid, Row, Col, Button, Table, HelpBlock} from 'react-bootstrap';

class Products extends Component {
    showProductName(product) {
        if (this.props.readonly) {
            return (<span className="font-weight-bold color-greyish-brown"> {product.store_product_name} </span>);
        }
        else {
            return (<a value={product.store_product_id} onClick={this.props.productOnClick.bind(this, product.store_product_id)}>{product.store_product_name}</a>);
        }
    }

    getActiveTiers(tierGroups, productEndDate) {
        let activeTiers = [];

        if(this.props.isYearBook) {
            return tierGroups;
        }

        tierGroups.map((tier) => {
            if(tier.active) {
                activeTiers.push(tier);
            }
        })
        if(!activeTiers.length) {
            let lastActiveTiers = [];
            tierGroups.map((tier) => {
                const tier_end_date = new Date(tier.end_date);
                if(productEndDate.getTime() === tier_end_date.getTime()) {
                    lastActiveTiers.push(tier);
                }
            })
            return lastActiveTiers;
        }
        else {
            return activeTiers;
        }
    }

    render() {
        return (
            <div className="products">
                {
                    this.props.products.map((product, i) => {
                        if (product.is_a_la_carte) {
                            const grades_is_text = this.props.gradesIsText ? this.props.gradesIsText : false;
                            let enrichedTiers = product.pricing_tiers;
                            if (!grades_is_text) {
                                enrichedTiers = enrichTiers(product.pricing_tiers, new Date(product.sale_close_date));
                            }
                            let show_description = false;
                            let child_product_names = [];
                            let product_grade_names = "";
                            let grade_names = "";
                            let date = "";
                            let today = Date.parse( new Date() );

                            if (this.props.storeGrades) {
                                product_grade_names = grades_is_text ? this.props.storeGrades : translateGrades(this.props.storeGrades, this.props.grades);
                            }

                            const tiers_are_grouped = this.props.gradesIsText ? this.props.gradesIsText : false;
                            let tierGroups = product.pricing_tiers;

                            if (!tiers_are_grouped) {
                                if (!grades_is_text) {
                                    tierGroups = makeTierGroups(enrichedTiers, true);
                                }
                                else {
                                    tierGroups = makeTierGroups(product.pricing_tiers, true);
                                }
                            }

                            if (this.props.isCollapsed) {
                                tierGroups = this.getActiveTiers(tierGroups, new Date(product.sale_close_date));
                            }
                            else if (["Yearbook","Package","Custom"].includes(product.product_category.product_category_name)) {
                              show_description = true;
                              if(product.child_product_ids.length) {
                                  let item;
                                  product.child_product_ids.forEach( id => {
                                      item = this.props.storeProducts.find(product => product.store_product_id === id);
                                      if(item && item.product_category.product_category_name !== "Yearbook") {
                                          child_product_names.push(item.store_product_name);
                                      }
                                  });
                              }
                            }

                            const isOneTier = tierGroups.length === 1 ? true : false;
                            if (isOneTier) {
                                if (grades_is_text) {
                                    date = formattedDate(tierGroups[0].start_date);
                                }
                                else {
                                    date = formattedDate(tierGroups[0].start_date) + " - " + formattedDate(tierGroups[0].end_date);
                                }

                                if (tiers_are_grouped) {
                                    grade_names = tierGroups[0].grades;
                                    tierGroups[0].consumer_price = accounting.formatNumber(tierGroups[0].price, 2);
                                }
                                else {
                                    const salesTaxRate = this.props.priceIncludesTaxes && !this.props.isNonTaxable ? this.props.salesTaxRate : 0;
                                    tierGroups[0].formatTierGroup(salesTaxRate);
                                    if (tierGroups[0].grades) {
                                        grade_names = translateGrades(tierGroups[0].grades, this.props.grades);
                                    }
                                }
                            }
                            if (product_grade_names === grade_names) {
                                grade_names = "ALL";
                            }

                            let is_salable = product.is_salable;
                            let close_date = new Date( product.sale_close_date );
                            let isProductOnline = isOnline(is_salable, close_date);

                            return (
                                tierGroups.length ?
                                    <div key={i}>
                                        <Row>
                                            <Col md={4}>
                                                {this.showProductName(product)}
                                            </Col>
                                            {
                                                show_description ?
                                                    <Col md={6}>
                                                        <span className="product-description"> {product.store_product_description} </span>
                                                    </Col>
                                                :
                                                    <Col md={6}>
                                                        <Col md={3}>
                                                            {grade_names}
                                                        </Col>
                                                        <Col md={3}>
                                                            {(isOneTier) ? "$"+tierGroups[0].consumer_price : ""}
                                                        </Col>
                                                        <Col className="p-l30" md={6}>
                                                            {date}
                                                        </Col>
                                                    </Col>
                                            }
                                            <Col md={2}>
                                                <Col md={this.props.readonly ? 12 : 7}>
                                                    {
                                                       this.props.readonly || today > Date.parse( product.sale_close_date ) ?
                                                          <div
                                                              className={ isProductOnline ? "toggle-active-transparent-md" : "toggle-inactive-transparent-md" }
                                                          />
                                                      :
                                                          <div
                                                              onClick={ this.props.toggleProductStatus.bind(this, product) }
                                                              className={ isProductOnline ? "toggle-active-md" : "toggle-inactive-md" }
                                                          />
                                                    }
                                                </Col>
                                                {this.props.readonly ? '' :
                                                    <Col md={5}>
                                                        {
                                                            this.props.isYearBook ? "" :
                                                                <span onClick={this.props.productOnDelete.bind(this, product)} className="color-red" >Remove</span>
                                                        }
                                                    </Col>
                                                }
                                            </Col>
                                        </Row>
                                        {
                                            isOneTier && !show_description?
                                                ""
                                            :
                                                <PricingTiers
                                                    {...this.props}
                                                    product_grade_names={product_grade_names}
                                                    tiers={tierGroups}
                                                />
                                        }
                                        {
                                            this.props.isCollapsed ?
                                                ""
                                            :
                                                <Personalizations
                                                    {...this.props}
                                                    product={product}
                                                />
                                        }
                                        {
                                            child_product_names.length ?
                                                <ChildProducts child_product_names={child_product_names} />
                                            : ""
                                        }
                                    </div>
                                :
                                    ""
                            )
                        }
                    })
                }
            </div>
        );
    }
}

module.exports = Products;


import accounting from "accounting";

export default class PricingTierGroup {
    /**
     * Create a tier group with no tiers added.
     * @param start_date the date the pricing tiers in the group start
     * @param price the base price of the tiers in the group
     */
    constructor( start_date, price ) {
        this.start_date = start_date;
        this.price = price;
        this.grades = [];
        this.consumer_price = "";
        this.sales_tax = "";
    }

    /**
     * Return whether the given tier is a member of this group.
     * Tiers are part of a group when their price and start date match.
     * @param tier the tier to consider for membership
     * @return whether the tier is a member of this group
     */
    shouldContain( tier ) {
        return this.start_date === tier.start_date &&
            this.price === tier.price;
    }

    /**
     * Adds a tier to this tier group.
     * @param tier the tier to add
     */
    addTier( tier ) {
        this.grades.push( tier.grade_id );
    }

    /**
     * Return the tiers in this group.
     * @return an array of tiers in this group
     */
    getTiers() {
        return this.grades.map(grade => ({
            "start_date": this.start_date,
            "price": this.price,
            "grade_id": grade
        }));
    }

    formatTierGroup( sales_tax_rate ) {
        this.sales_tax = accounting.formatNumber( accounting.unformat( this.price ) * accounting.unformat( sales_tax_rate ), 2 );
        const new_consumer_price = accounting.unformat( this.price ) + accounting.unformat( this.sales_tax );
        this.consumer_price = accounting.formatNumber( new_consumer_price, 2 );
        this.price = accounting.formatNumber( this.price, 2 );
        this.grades = this.grades.map( grade => { return grade ? grade.toString() : ""; });
    }
}

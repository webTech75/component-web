import PricingTierGroup from './PricingTierGroup';

export default class DetailedPricingTierGroup extends PricingTierGroup {
  constructor(start_date, end_date, price, active) {
    super(start_date, price);
    this.end_date = end_date;
    this.active = active;
  }

  shouldContain(tier) {
    return this.start_date === tier.start_date &&
      this.price === tier.price &&
      this.end_date === tier.end_date;
  }

  getTiers() {
    return this.grades.map(grade => ({
      "start_date": this.start_date,
      "price": this.price,
      "grade_id": grade,
      "end_date": this.end_date,
      "active": this.active
    }));
  }
}



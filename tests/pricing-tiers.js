import { expect } from 'chai';
import moment from 'moment';
import { PricingTierGroup, DetailedPricingTierGroup, getTiersStartDates, enrichTiers } from '../pricing-tiers';


describe('PricingTierGroup', () => {
  const d = new Date();
  const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  let tomorrow = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
  let yesterday= new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);

  function makeGroup() {
    const group = new PricingTierGroup(today, 1.00);
    group.grades = [1, 2];
    return group;
  }

  function makeTier() {
    return {
      start_date: today,
      price: 1.00,
      grade_id: 3,
    };
  }

  describe('constructor', () => {
    it('should create a tier with the same start date', () => {
      const group = new PricingTierGroup(today, 1.00);
      expect(group).to.have.property('start_date').that.equals(today);
    });

    it('should create a tier with the same price', () => {
      const group = new PricingTierGroup(today, 1.00);
      expect(group).to.have.property('price').that.equals(1.00);
    });

    it('should create a tier with no grades', () => {
      const group = new PricingTierGroup(today, 1.00);
        expect(group).to.have.property('grades').that.is.empty;
    });
  });

  describe('shouldContain', () => {
    it('is true when start date and price are the same', () => {
      const group = makeGroup();
      const tier = makeTier();
      expect(group.shouldContain(tier)).to.be.true;
    });

    it('is false when start date is different', () => {
      const group = makeGroup();
      const tier = makeTier();
      tier.start_date = tomorrow;
      expect(group.shouldContain(tier)).to.be.false;
    });

    it('is false when price is different', () => {
      const group = makeGroup();
      const tier = makeTier();
      tier.price = 2.00;
      expect(group.shouldContain(tier)).to.be.false;
    });
  });

  describe('addTier', () => {
    function makeGroupAndAddTier() {
      const group = makeGroup();
      const tier = makeTier();
      group.addTier(tier);
      return group;
    }

    it('should increase number of grades by one', () => {
      const group = makeGroup();
      const numGrades = group.grades.length;
      const tier = makeTier();
      group.addTier(tier);
      expect(group).to.have.property('grades').with.lengthOf(numGrades + 1);
    });

    it('should make grades contain the tier\'s grade', () => {
      const group = makeGroup();
      const tier = makeTier();
      group.addTier(tier);
      expect(group).to.have.property('grades').that.includes(tier.grade_id);
    });
  });

  describe('getTiers', () => {
    it('should return a list the same length as grades', () => {
      const group = makeGroup();
      expect(group.getTiers()).to.have.lengthOf(group.grades.length);
    });

    it('should contain tiers with grade_ids from grades', () => {
      const group = makeGroup();
      group.getTiers().forEach(tier => {
        expect(tier).to.have.property('grade_id').that.is.oneOf(group.grades);
      });
    });

    it('should contain tiers with the same start date', () => {
      const group = makeGroup();
      group.getTiers().forEach(tier => {
        expect(tier).to.have.property('start_date').that.equals(group.start_date);
      });
    });

    it('should contain tiers with the same price', () => {
      const group = makeGroup();
      group.getTiers().forEach(tier => {
        expect(tier).to.have.property('price').that.equals(group.price);
      });
    });
  });
});


describe('DetailedPricingTierGroup', () => {
  const d = new Date();
  const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  let tomorrow = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
  let day_after_tomorrow = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 2);
  let yesterday= new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);

  function makeGroup() {
    const group = new DetailedPricingTierGroup(today, tomorrow, 1.00, true);
    group.grades = [1, 2];
    return group;
  }

  function makeTier() {
    return {
      start_date: today,
      price: 1.00,
      grade_id: 3,
      active: true,
      end_date: tomorrow
    };
  }

  describe('constructor', () => {
    it('should create a tier with the same start date', () => {
      const group = new DetailedPricingTierGroup(today, tomorrow, 1.00, true);
      expect(group).to.have.property('start_date').that.equals(today);
    });

    it('should create a tier with the same end date', () => {
      const group = new DetailedPricingTierGroup(today, tomorrow, 1.00, true);
      expect(group).to.have.property('end_date').that.equals(tomorrow);
    });

    it('should create a tier with the same price', () => {
      const group = new DetailedPricingTierGroup(today, tomorrow, 1.00, true);
      expect(group).to.have.property('price').that.equals(1.00);
    });

    it('should create a tier with no grades', () => {
      const group = new DetailedPricingTierGroup(today, tomorrow, 1.00, true);
        expect(group).to.have.property('grades').that.is.empty;
    });
  });

  describe('shouldContain', () => {
    it('is true when start date, end_date, and price are the same', () => {
      const group = makeGroup();
      const tier = makeTier();
      expect(group.shouldContain(tier)).to.be.true;
    });

    it('is false when start date is different', () => {
      const group = makeGroup();
      const tier = makeTier();
      tier.start_date = tomorrow;
      expect(group.shouldContain(tier)).to.be.false;
    });

    it('is false when price is different', () => {
      const group = makeGroup();
      const tier = makeTier();
      tier.price = 2.00;
      expect(group.shouldContain(tier)).to.be.false;
    });

    it('is false when end date is different', () => {
      const group = makeGroup();
      const tier = makeTier();
      tier.end_date = day_after_tomorrow;
      expect(group.shouldContain(tier)).to.be.false;
    });
  });

  describe('addTier', () => {
    function makeGroupAndAddTier() {
      const group = makeGroup();
      const tier = makeTier();
      group.addTier(tier);
      return group;
    }

    it('should increase number of grades by one', () => {
      const group = makeGroup();
      const numGrades = group.grades.length;
      const tier = makeTier();
      group.addTier(tier);
      expect(group).to.have.property('grades').with.lengthOf(numGrades + 1);
    });

    it('should make grades contain the tier\'s grade', () => {
      const group = makeGroup();
      const tier = makeTier();
      group.addTier(tier);
      expect(group).to.have.property('grades').that.includes(tier.grade_id);
    });
  });

  describe('getTiers', () => {
    it('should return a list the same length as grades', () => {
      const group = makeGroup();
      expect(group.getTiers()).to.have.lengthOf(group.grades.length);
    });

    it('should contain tiers with grade_ids from grades', () => {
      const group = makeGroup();
      group.getTiers().forEach(tier => {
        expect(tier).to.have.property('grade_id').that.is.oneOf(group.grades);
      });
    });

    it('should contain tiers with the same start date', () => {
      const group = makeGroup();
      group.getTiers().forEach(tier => {
        expect(tier).to.have.property('start_date').that.equals(group.start_date);
      });
    });

    it('should contain tiers with the same price', () => {
      const group = makeGroup();
      group.getTiers().forEach(tier => {
        expect(tier).to.have.property('price').that.equals(group.price);
      });
    });
  });
});


describe('Supporting Functions', () => {
  const d = new Date();
  const dateFormat = 'YYYY-MM-DDT00:00:00';
  const today = moment().format(dateFormat);
  const yesterday = moment().subtract(1, 'days').format(dateFormat);
  const tomorrow = moment().add(1, 'days').format(dateFormat);
  const lastDate = moment().add(2, 'days').format(dateFormat);

  function getMultipleTiers() {
    return [
      {
        start_date: today,
        price: 2.00,
        grade_id: 3,
      },
      {
        start_date: today,
        price: 2.00,
        grade_id: 4,
      },
      {
        start_date: yesterday,
        price: 1.00,
        grade_id: 3,
      },
      {
        start_date: yesterday,
        price: 1.00,
        grade_id: 4,
      },
      {
        start_date: tomorrow,
        price: 3.00,
        grade_id: 3,
      },
      {
        start_date: tomorrow,
        price: 3.00,
        grade_id: 4,
      },
    ];
  }

  describe('getTiersStartDate', () => {
    const tiers = getMultipleTiers();
    it('handles an empty array.', () => {
      const startDates = getTiersStartDates([], lastDate);
      expect(startDates).is.eql({});
    });

    it('produces two grades.', () => {
      const startDates = getTiersStartDates(tiers, lastDate);
      expect(Object.keys(startDates)).is.eql(['3', '4']);
    });

    it('has 3 dates per grade and are sorted earliest to latest.', () => {
      const startDates = getTiersStartDates(tiers, lastDate);
      const keys = Object.keys(startDates);
      expect(startDates[keys[0]]).is.eql([yesterday, today, tomorrow]);
      expect(startDates[keys[1]]).is.eql([yesterday, today, tomorrow]);
    });
  });

  describe('enrichTiers', () => {
    const tiers = getMultipleTiers();
    const productEndDate = lastDate;

    it('handles empty tiers', () => {
      const enrichedTiers = enrichTiers([], productEndDate);
      expect(enrichedTiers).is.eql([]);
    });

    it('marks proper tiers as active', () => {
      const enrichedTiers = enrichTiers(tiers, productEndDate);
      const todaysTier = enrichedTiers.find((tier) => {
        return tier.start_date === today;
      });
      expect(todaysTier.active).is.true;
    });

    it('marks proper end dates', () => {
      const enrichedTiers = enrichTiers(tiers, productEndDate);
      const todaysTier = enrichedTiers.find((tier) => {
        return tier.start_date === today;
      });
      expect(todaysTier.end_date).is.eql(today);
    });

  });
});

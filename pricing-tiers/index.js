import moment from 'moment';

import PricingTierGroup from './PricingTierGroup';
import DetailedPricingTierGroup from './DetailedPricingTierGroup';
export { default as PricingTierGroup } from './PricingTierGroup';
export { default as DetailedPricingTierGroup } from './DetailedPricingTierGroup';

/**
 * Add a tier to a list of groups. If the tier isn't a member of any of the
 * groups, create a new group for that tier and add it to the end list.
 * @param groups the array of groups to add the tier to
 * @param tier the tier to add
 * @return the array of groups with the tier added.
 */
export function addTierToGroups(groups, tier, isDetailed=false) {
    if (groups.length === 0) {
        let group;
        if (isDetailed && tier.end_date) {
          group = new DetailedPricingTierGroup(tier.start_date, tier.end_date, tier.price, tier.active);
        } else {
          group = new PricingTierGroup(tier.start_date, tier.price);
        }
        group.addTier(tier);
        return [ group ];
    }
    const [ group, ...otherGroups ] = groups;
    if (group.shouldContain(tier)) {
        group.addTier(tier);
        return [ group, ...otherGroups ];
    }
    return [ group, ...addTierToGroups(otherGroups, tier, isDetailed) ];
}

/**
 * Given a list of tiers, returns the list of collapsed tier groups.
 * @param tiers an array of tiers.
 * @return an array of tier groups.
 */
export function makeTierGroups(tiers, isDetailed=false) {
    let groups = [];
    for (let tier of tiers) {
        groups = addTierToGroups(groups, tier, isDetailed);
    }
    return groups;
}

/**
 * Given a list of tier groups, return the tiers from all those groups.
 * @param groups an array of tier groups.
 * @return an array of tiers.
 */
export function separateTierGroups(groups) {
    let tiers = groups.map(group => group.getTiers());
    // Flatten the grouped tier lists.
    return [].concat.apply([], tiers);
}

export function createBlankTiers(num_tiers) {
    return Array.from(Array(num_tiers), (i) => {
        return new PricingTierGroup("", "");
    });
}

export function makeFormattedTierGroups(tiers, sales_tax_rate, max_num_tiers=6) {
    let interim_tiers = makeTierGroups(tiers);
    let formatted_tiers = interim_tiers.map(tier => {
        tier.formatTierGroup(sales_tax_rate);
        return tier;
    });
    const num_blank_tiers = max_num_tiers - formatted_tiers.length;
    let blank_tiers = createBlankTiers(num_blank_tiers);
    return formatted_tiers.concat(blank_tiers);
}

export function getTiersStartDates(tiers, endDate) {
  let tierStartDates = {};
  tiers.map((tier) => {
    const start_date = tier.start_date;
    if (!Object.keys(tierStartDates).includes(tier.grade_id.toString())) {
      tierStartDates[tier.grade_id] = [start_date];
    } else {
      tierStartDates[tier.grade_id].push(start_date);
    }
  });

  // add end date and sort the dates
  Object.keys(tierStartDates).map((gradeId) => {
    tierStartDates[gradeId].sort((a, b) => {
      const aDate = new Date(Date.parse(a));
      const bDate = new Date(Date.parse(b));
      return aDate.getTime() - bDate.getTime();
    });
  });
  return tierStartDates;
}

export function enrichTiers(tiers, defaultEndDate) {
  const tiersStartDates = getTiersStartDates(tiers, defaultEndDate);
  const dateFormat = 'YYYY-MM-DDT00:00:00';
  // Two types of enrichments:
  // 1. Set "endDate" for the tier.
  // 2. Set "active" to true or false.
  tiers.map((tier) => {
    const dates = tiersStartDates[tier.grade_id.toString()];
    const indexCurrentDate = dates.findIndex((tier_date, index, array) => {
      return tier_date === tier.start_date;
    });

    let endDate = defaultEndDate;

    if (indexCurrentDate < (dates.length - 1)) {
      const nextDate = dates[indexCurrentDate + 1];
      endDate = moment(nextDate).isValid() ? moment(nextDate).subtract(1, 'days').format(dateFormat) : endDate;
    }
    tier.end_date = endDate;

    const today = moment().set({hour: 0, minute: 0, second: 0, millisecond: 0});
    const startDate = moment(tier.start_date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    endDate = moment(endDate).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    tier.active = today.isBetween(startDate, endDate, null, []); // the last [] means inclusive on both start and end dates.
  });
  return tiers;
}


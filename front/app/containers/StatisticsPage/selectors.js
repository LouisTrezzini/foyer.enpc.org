import { createSelector } from 'reselect';

/**
 * Direct selector to the statisticsPage state domain
 */

const selectStatisticsPageDomain = state => state.get('statisticsPage');

/**
 * Other specific selectors
 */

/**
 * Default selector used by StatisticsPage
 */

const makeSelectStatisticsPageIsLoading = () =>
  createSelector(
    selectStatisticsPageDomain,
    substate => substate.data === null || substate.pending > 0,
  );

const makeSelectStatisticsPromoBalances = () =>
  createSelector(selectStatisticsPageDomain, substate => {
    if (!substate.data) {
      return null;
    }
    const stats = substate.data.promoBalances;
    if (!stats) {
      return null;
    }

    return stats.labels.map((e, i) => ({ promo: e, balance: stats.data[i] }));
  });

const makeSelectStatisticsSoldDrinks = () =>
  createSelector(selectStatisticsPageDomain, substate => {
    if (!substate.data) {
      return null;
    }
    const stats = substate.data.soldBeers;
    if (!stats) {
      return null;
    }

    return stats.labels.map((e, i) => ({ drink: e, count: +stats.data[i] }));
  });

export {
  makeSelectStatisticsPageIsLoading,
  makeSelectStatisticsPromoBalances,
  makeSelectStatisticsSoldDrinks,
};

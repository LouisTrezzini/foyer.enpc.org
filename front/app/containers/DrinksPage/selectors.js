import { createSelector } from 'reselect';

/**
 * Direct selector to the drinksPage state domain
 */

const selectDrinksPageDomain = state => state.get('drinksPage');

/**
 * Other specific selectors
 */

const makeSelectDrinksPageIsLoading = () =>
  createSelector(
    selectDrinksPageDomain,
    substate => substate.data === null || substate.pending > 0,
  );

const makeSelectDrinks = () =>
  createSelector(selectDrinksPageDomain, substate => substate.data);

export { makeSelectDrinksPageIsLoading, makeSelectDrinks };

import { createSelector } from 'reselect';

/**
 * Direct selector to the drinksPage state domain
 */

const selectDrinksPageDomain = state => state.get('drinksPage');

/**
 * Other specific selectors
 */

const makeSelectDrinks = () =>
  createSelector(selectDrinksPageDomain, substate => substate.data);

export { makeSelectDrinks };

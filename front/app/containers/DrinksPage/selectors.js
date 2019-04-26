import { isEmpty } from 'lodash';
import { createSelector } from 'reselect';

/**
 * Direct selector to the drinksPage state domain
 */

const selectDrinksPageDomain = state => state.drinksPage;

/**
 * Other specific selectors
 */

const makeSelectDrinksPageIsLoading = () =>
  createSelector(
    selectDrinksPageDomain,
    substate => isEmpty(substate.data) || substate.pending > 0,
  );

const makeSelectDrinks = () =>
  createSelector(
    selectDrinksPageDomain,
    substate => substate.data,
  );

export { makeSelectDrinksPageIsLoading, makeSelectDrinks };

import { isEmpty } from 'lodash';
import { createSelector } from 'reselect';

/**
 * Direct selector to the drinkEditPage state domain
 */

const selectDrinkEditPageDomain = state => state.get('drinkEditPage');

/**
 * Other specific selectors
 */

const makeSelectDrinkEditPageIsLoading = () =>
  createSelector(
    selectDrinkEditPageDomain,
    substate => isEmpty(substate.data) || substate.pending > 0,
  );

const makeSelectDrinkEdit = () =>
  createSelector(
    selectDrinkEditPageDomain,
    substate => substate.data,
  );

export { makeSelectDrinkEditPageIsLoading, makeSelectDrinkEdit };

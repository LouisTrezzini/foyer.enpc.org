import { isEmpty } from 'lodash';
import { createSelector } from 'reselect';

/**
 * Direct selector to the checkoutPage state domain
 */

const selectCheckoutPageDomain = state => state.checkoutPage;

/**
 * Other specific selectors
 */

const makeSelectCheckoutPageIsLoading = () =>
  createSelector(
    selectCheckoutPageDomain,
    substate => isEmpty(substate.data) || substate.pending > 0,
  );

const makeSelectCheckoutPageRecentDrinks = () =>
  createSelector(
    selectCheckoutPageDomain,
    substate => (isEmpty(substate.data) ? [] : substate.data[0]),
  );

const makeSelectCheckoutPageRecentTransactions = () =>
  createSelector(
    selectCheckoutPageDomain,
    substate => (isEmpty(substate.data) ? [] : substate.data[1].data),
  );

const makeSelectCheckoutPageSelectedStudent = () =>
  createSelector(
    selectCheckoutPageDomain,
    substate => substate.selectedStudent,
  );

const makeSelectCheckoutPageSelectedDrinks = () =>
  createSelector(
    selectCheckoutPageDomain,
    substate => substate.selectedDrinks,
  );

export {
  makeSelectCheckoutPageIsLoading,
  makeSelectCheckoutPageRecentTransactions,
  makeSelectCheckoutPageRecentDrinks,
  makeSelectCheckoutPageSelectedStudent,
  makeSelectCheckoutPageSelectedDrinks,
};

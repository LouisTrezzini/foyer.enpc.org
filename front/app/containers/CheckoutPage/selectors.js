import { isEmpty } from 'lodash';
import { createSelector } from 'reselect';

/**
 * Direct selector to the checkoutPage state domain
 */

const selectCheckoutPageDomain = state => state.get('checkoutPage');

/**
 * Other specific selectors
 */

const makeSelectCheckoutPageIsLoading = () =>
  createSelector(
    selectCheckoutPageDomain,
    substate => isEmpty(substate.data) || substate.pending > 0,
  );

const makeSelectCheckoutPageRecentTransactions = () =>
  createSelector(
    selectCheckoutPageDomain,
    substate => (isEmpty(substate.data) ? [] : substate.data[0].data),
  );

const makeSelectCheckoutPageRecentDrinks = () =>
  createSelector(
    selectCheckoutPageDomain,
    substate => (isEmpty(substate.data) ? [] : substate.data[1]),
  );

const makeSelectCheckoutPageSelectedStudent = () =>
  createSelector(
    selectCheckoutPageDomain,
    substate => substate.selectedStudent,
  );

export {
  makeSelectCheckoutPageIsLoading,
  makeSelectCheckoutPageRecentTransactions,
  makeSelectCheckoutPageRecentDrinks,
  makeSelectCheckoutPageSelectedStudent,
};

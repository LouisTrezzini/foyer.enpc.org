import { createSelector } from 'reselect';

/**
 * Direct selector to the transactionsPage state domain
 */

const selectTransactionsPageDomain = state => state.transactionsPage;

/**
 * Other specific selectors
 */
const makeSelectTransactionsPageIsLoading = () =>
  createSelector(
    selectTransactionsPageDomain,
    substate => substate.data === null,
  );

const makeSelectTransactions = () =>
  createSelector(
    selectTransactionsPageDomain,
    substate => substate.data,
  );

export { makeSelectTransactionsPageIsLoading, makeSelectTransactions };

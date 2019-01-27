import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the transactionsPage state domain
 */

const selectTransactionsPageDomain = state =>
  state.get('transactionsPage', initialState);

/**
 * Other specific selectors
 */
const makeSelectTransactions = () =>
  createSelector(selectTransactionsPageDomain, substate =>
    substate.get('transactions').toJS(),
  );

/**
 * Default selector used by TransactionsPage
 */

const makeSelectTransactionsPage = () =>
  createSelector(selectTransactionsPageDomain, substate => substate.toJS());

export default makeSelectTransactionsPage;
export { selectTransactionsPageDomain, makeSelectTransactions };
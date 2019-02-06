/*
 *
 * TransactionsPage actions
 *
 */

import { FETCH_TRANSACTIONS } from './constants';

export function fetchTransactionsAction(activePage = 1) {
  return {
    type: FETCH_TRANSACTIONS,
    payload: {
      request: {
        method: 'GET',
        url: '/transactions',
        params: {
          page: activePage,
        },
      },
    },
  };
}

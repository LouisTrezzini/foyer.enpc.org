/*
 *
 * TransactionsPage actions
 *
 */

import { FETCH_TRANSACTIONS } from './constants';

export function fetchTransactionsAction() {
  return {
    type: FETCH_TRANSACTIONS,
    payload: {
      request: {
        method: 'GET',
        url: '/transactions',
      },
    },
  };
}

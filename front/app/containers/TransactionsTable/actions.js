/*
 *
 * TransactionsTable actions
 *
 */

import { DELETE_TRANSACTION } from './constants';

export function deleteTransactionAction(transaction) {
  const { id: transactionId } = transaction;

  return {
    type: DELETE_TRANSACTION,
    meta: {
      transactionId,
      thunk: {
        id: transactionId,
      },
    },
    payload: {
      request: {
        method: 'DELETE',
        url: `/transactions/${transactionId}`,
      },
    },
  };
}

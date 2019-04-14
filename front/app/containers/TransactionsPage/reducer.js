/*
 *
 * TransactionsPage reducer
 *
 */

import { DELETE_TRANSACTION } from 'containers/TransactionsTable/constants';
import { cloneDeep } from 'lodash';
import { requestsReducer, success } from 'redux-saga-requests';
import { FETCH_TRANSACTIONS } from './constants';

const transactionsPageReducer = (state, action) => {
  switch (action.type) {
    case success(DELETE_TRANSACTION): {
      const newData = cloneDeep(state.data);
      newData.data = newData.data.filter(
        transaction => transaction.id !== action.meta.transactionId,
      );
      return { ...state, data: newData };
    }
    default:
      return state;
  }
};

export default requestsReducer(
  { actionType: FETCH_TRANSACTIONS },
  transactionsPageReducer,
);

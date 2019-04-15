/*
 *
 * TransactionsPage reducer
 *
 */

import { DELETE_TRANSACTION } from 'containers/TransactionsTable/constants';
import { cloneDeep } from 'lodash';
import { requestsReducer } from 'redux-saga-requests';
import { FETCH_TRANSACTIONS } from './constants';

export default requestsReducer({
  actionType: FETCH_TRANSACTIONS,
  operations: {
    [DELETE_TRANSACTION]: {
      updateData: (state, action) => {
        const newData = cloneDeep(state.data);
        newData.data = newData.data.filter(
          transaction => transaction.id !== action.meta.transactionId,
        );
        return newData;
      },
      getRequestKey: requestAction => String(requestAction.meta.transactionId), // you need to use string if id is an integer
    },
  },
});

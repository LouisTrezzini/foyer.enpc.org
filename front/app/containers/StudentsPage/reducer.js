/*
 *
 * StudentsPage reducer
 *
 */

import { DELETE_TRANSACTION } from 'containers/TransactionsTable/constants';
import { cloneDeep } from 'lodash';
import { requestsReducer } from 'redux-saga-requests';
import { FETCH_STUDENT_WITH_TRANSACTIONS, RESET_STUDENT } from './constants';

export default requestsReducer({
  actionType: FETCH_STUDENT_WITH_TRANSACTIONS,
  operations: {
    [RESET_STUDENT]: () => null,
    [DELETE_TRANSACTION]: {
      updateData: (state, action) => {
        const newData = cloneDeep(state.data);
        if (newData) {
          newData.data = newData.data.filter(
            transaction => transaction.id !== action.meta.transactionId,
          );
        }
        return newData;
      },
      getRequestKey: requestAction => String(requestAction.meta.transactionId), // you need to use string if id is an integer
    },
  },
});

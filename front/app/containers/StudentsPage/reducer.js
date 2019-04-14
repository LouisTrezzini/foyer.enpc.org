/*
 *
 * StudentsPage reducer
 *
 */

import { DELETE_TRANSACTION } from 'containers/TransactionsTable/constants';
import { cloneDeep } from 'lodash';
import { requestsReducer, success } from 'redux-saga-requests';
import { FETCH_STUDENT, RESET_STUDENT } from './constants';

const studentsPageReducer = (state, action) => {
  switch (action.type) {
    case RESET_STUDENT:
      return { ...state, data: null };
    case success(DELETE_TRANSACTION): {
      const newData = cloneDeep(state.data);
      newData[1].data = newData[1].data.filter(
        transaction => transaction.id !== action.meta.transactionId,
      );
      return { ...state, data: newData };
    }
    default:
      return state;
  }
};

export default requestsReducer(
  { actionType: FETCH_STUDENT },
  studentsPageReducer,
);

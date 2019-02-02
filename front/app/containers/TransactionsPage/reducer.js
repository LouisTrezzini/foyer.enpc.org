/*
 *
 * TransactionsPage reducer
 *
 */

import { fromJS } from 'immutable';
import { success } from 'redux-saga-requests';
import { FETCH_TRANSACTIONS } from './constants';

export const initialState = fromJS({
  transactions: [],
});

function transactionsPageReducer(state = initialState, action) {
  switch (action.type) {
    case success(FETCH_TRANSACTIONS):
      return state
        .set('transactions', action.payload.data.data)
        .setIn(['pagination', 'infos'], action.payload.data.pagination_infos)
        .setIn(['pagination', 'params'], action.payload.data.pagination_params);
    default:
      return state;
  }
}

export default transactionsPageReducer;

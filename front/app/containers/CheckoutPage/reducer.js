/*
 *
 * CheckoutPage reducer
 *
 */

import { requestsReducer, success } from 'redux-saga-requests';
import { FETCH_RECENT_TRANSACTIONS, FETCH_STUDENT } from './constants';

const checkoutPageReducer = (state = { selectedStudent: null }, action) => {
  switch (action.type) {
    case success(FETCH_STUDENT):
      return { ...state, selectedStudent: action.payload.data };
    default:
      return state;
  }
};

export default requestsReducer(
  {
    actionType: FETCH_RECENT_TRANSACTIONS,
    multiple: true,
  },
  checkoutPageReducer,
);

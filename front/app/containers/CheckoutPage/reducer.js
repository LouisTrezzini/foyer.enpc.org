/*
 *
 * CheckoutPage reducer
 *
 */

import { requestsReducer, success } from 'redux-saga-requests';
import {
  DESELECT_DRINK,
  FETCH_RECENT_TRANSACTIONS,
  INIT_CHECKOUT_PAGE,
  RESET_CHECKOUT,
  SELECT_DRINK,
  SELECT_STUDENT,
} from './constants';

const checkoutPageReducer = (
  state = { selectedStudent: null, selectedDrinks: [] },
  action,
) => {
  switch (action.type) {
    case SELECT_DRINK:
      return {
        ...state,
        selectedDrinks: [...state.selectedDrinks, action.payload.drink],
      };
    case DESELECT_DRINK:
      return {
        ...state,
        selectedDrinks: [
          ...state.selectedDrinks.slice(0, action.payload.drinkIdx),
          ...state.selectedDrinks.slice(action.payload.drinkIdx + 1),
        ],
      };
    case success(SELECT_STUDENT):
      return { ...state, selectedStudent: action.payload.data };
    case RESET_CHECKOUT:
      return { ...state, selectedStudent: null, selectedDrinks: [] };
    default:
      return state;
  }
};

export default requestsReducer(
  {
    actionType: INIT_CHECKOUT_PAGE,
    multiple: true,
    operations: {
      [FETCH_RECENT_TRANSACTIONS]: (state, action) => [
        state.data[0],
        action.payload.data,
      ],
    },
  },
  checkoutPageReducer,
);

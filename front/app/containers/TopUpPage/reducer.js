/*
 *
 * TopUpPage reducer
 *
 */

import { requestsReducer } from 'redux-saga-requests';
import { CLOSE_SUCCESS_DIMMER, OPEN_SUCCESS_DIMMER, TOP_UP } from './constants';

const topUpPageReducer = (state = { isDimmed: false }, action) => {
  switch (action.type) {
    case OPEN_SUCCESS_DIMMER:
      return { ...state, isDimmed: true, meta: action.meta };
    case CLOSE_SUCCESS_DIMMER:
      return { ...state, isDimmed: false, meta: undefined };
    default:
      return state;
  }
};

export default requestsReducer({ actionType: TOP_UP }, topUpPageReducer);

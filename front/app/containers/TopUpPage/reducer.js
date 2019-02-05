/*
 *
 * TopUpPage reducer
 *
 */

import { requestsReducer, success } from 'redux-saga-requests';
import { CLOSE_SUCCESS_DIMMER, TOP_UP } from './constants';

const baseRequestsReducer = requestsReducer({ actionType: TOP_UP });

const successDimmerReducer = (state = { isDimmed: false }, action) => {
  switch (action.type) {
    case success(TOP_UP):
      return { ...state, isDimmed: true, meta: action.meta };
    case CLOSE_SUCCESS_DIMMER:
      return { ...state, isDimmed: false, meta: undefined };
    default:
      return state;
  }
};

export default (state, action) => {
  state = baseRequestsReducer(state, action);
  return successDimmerReducer(state, action);
};

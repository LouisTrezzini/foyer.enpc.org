/*
 *
 * TopUpPage actions
 *
 */

import { CLOSE_SUCCESS_DIMMER, OPEN_SUCCESS_DIMMER, TOP_UP } from './constants';

export function topUpAction(username, amount) {
  return {
    type: TOP_UP,
    payload: {
      request: {
        method: 'POST',
        url: '/transactions',
        data: {
          user: username,
          credit: amount,
        },
      },
    },
    meta: {
      username,
      amount,
    },
  };
}

export function openSuccessDimmerAction(meta) {
  return {
    type: OPEN_SUCCESS_DIMMER,
    meta,
  };
}

export function closeSuccessDimmerAction() {
  return {
    type: CLOSE_SUCCESS_DIMMER,
  };
}

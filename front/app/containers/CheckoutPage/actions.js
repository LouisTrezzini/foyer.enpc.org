/*
 *
 * CheckoutPage actions
 *
 */

import {
  CHECKOUT,
  FETCH_RECENT_TRANSACTIONS,
  FETCH_STUDENT,
} from './constants';

export function checkoutAction(username, drinks) {
  return {
    type: CHECKOUT,
    payload: {
      request: {
        method: 'POST',
        url: '/transactions',
        data: {
          user: username,
        },
      },
    },
  };
}

export function fetchRecentTransactionsAction() {
  return {
    type: FETCH_RECENT_TRANSACTIONS,
    payload: {
      request: [
        {
          method: 'GET',
          url: '/transactions',
          params: {
            limit: 20,
          },
        },
        {
          method: 'GET',
          url: '/beers',
        },
      ],
    },
  };
}

export function fetchStudentAction(username) {
  return {
    type: FETCH_STUDENT,
    payload: {
      request: {
        method: 'GET',
        url: `/users/${username}`,
      },
    },
  };
}

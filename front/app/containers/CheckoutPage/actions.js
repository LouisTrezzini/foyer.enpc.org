/*
 *
 * CheckoutPage actions
 *
 */

import { DESELECT_DRINK, RESET_CHECKOUT, SELECT_DRINK } from 'containers/CheckoutPage/constants';
import {
  CHECKOUT,
  FETCH_RECENT_TRANSACTIONS,
  SELECT_STUDENT,
  INIT_CHECKOUT_PAGE,
} from './constants';

export function checkoutAction(username, drinks) {
  return {
    type: CHECKOUT,
    payload: {
      request: drinks.map(drink => ({
        method: 'POST',
        url: '/transactions',
        data: {
          user: username,
          beer: drink.slug,
        },
      })),
    },
  };
}

export function initCheckoutPageAction() {
  return {
    type: INIT_CHECKOUT_PAGE,
    payload: {
      request: [
        {
          method: 'GET',
          url: '/beers',
        },
        {
          method: 'GET',
          url: '/transactions',
          params: {
            limit: 20,
          },
        },
      ],
    },
  };
}

export function fetchRecentTransactionsAction() {
  return {
    type: FETCH_RECENT_TRANSACTIONS,
    payload: {
      request: {
        method: 'GET',
        url: '/transactions',
        params: {
          limit: 20,
        },
      },
    },
  };
}

export function selectStudentAction(username) {
  return {
    type: SELECT_STUDENT,
    payload: {
      request: {
        method: 'GET',
        url: `/users/${username}`,
      },
    },
  };
}

export function selectDrinkAction(drink) {
  return {
    type: SELECT_DRINK,
    payload: {
      drink,
    },
  };
}

export function deselectDrinkAction(drinkIdx) {
  return {
    type: DESELECT_DRINK,
    payload: {
      drinkIdx,
    },
  };
}

export function resetCheckoutAction() {
  return {
    type: RESET_CHECKOUT,
  };
}

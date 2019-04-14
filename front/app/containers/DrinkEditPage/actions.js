/*
 *
 * DrinksPage actions
 *
 */

import { FETCH_DRINK } from './constants';

export function fetchDrinkAction(drinkId) {
  return {
    type: FETCH_DRINK,
    payload: {
      request: {
        method: 'GET',
        url: `/beers/${drinkId}`,
      },
    },
  };
}

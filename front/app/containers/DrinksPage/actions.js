/*
 *
 * DrinksPage actions
 *
 */

import { FETCH_DRINKS } from './constants';

export function fetchDrinksAction() {
  return {
    type: FETCH_DRINKS,
    payload: {
      request: {
        method: 'GET',
        url: '/beers',
      },
    },
  };
}

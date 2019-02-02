/*
 *
 * StatisticsPage actions
 *
 */

import { FETCH_STATISTICS } from './constants';

export function fetchStatisticsAction() {
  return {
    type: FETCH_STATISTICS,
    payload: {
      request: {
        method: 'GET',
        url: '/statistics/foyer/dashboard',
      },
    },
  };
}

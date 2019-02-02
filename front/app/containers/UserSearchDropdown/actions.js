/*
 *
 * UserSearchDropdown actions
 *
 */

import { SEARCH_USER } from './constants';

export function searchUserAction(query) {
  return {
    type: SEARCH_USER,
    payload: {
      query,

      request: {
        method: 'POST',
        url: '/search',
        data: {
          search: `User/${query}`,
        },
      },
    },
  };
}

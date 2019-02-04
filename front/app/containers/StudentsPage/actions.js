/*
 *
 * StudentsPage actions
 *
 */

import { FETCH_STUDENT } from './constants';

export function fetchStudentAction(username) {
  return {
    type: FETCH_STUDENT,
    meta: {
      username,
    },
    payload: {
      request: [
        {
          method: 'GET',
          url: `/users/${username}`,
        },
        {
          method: 'GET',
          url: `/users/${username}/transactions`,
        },
      ],
    },
  };
}

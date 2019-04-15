/*
 *
 * StudentsPage actions
 *
 */

import { FETCH_STUDENT_WITH_TRANSACTIONS, RESET_STUDENT } from './constants';

export function fetchStudentWithTransactionsAction(username) {
  return {
    type: FETCH_STUDENT_WITH_TRANSACTIONS,
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

export function resetStudentAction() {
  return {
    type: RESET_STUDENT,
  };
}

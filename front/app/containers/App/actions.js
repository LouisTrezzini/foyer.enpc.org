/*
 *
 * PrivateRoute actions
 *
 */

import { LOGIN_ACTION, LOGOUT_ACTION } from './constants';

export function loginAction(username, password) {
  return {
    type: LOGIN_ACTION,
    meta: {
      username,
      password,
    },
    payload: {
      request: {
        method: 'POST',
        url: '/login',
        data: {
          username,
          password,
        },
      },
    },
  };
}

export function logoutAction() {
  return {
    type: LOGOUT_ACTION,
  };
}

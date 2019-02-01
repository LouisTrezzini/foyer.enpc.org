/*
 *
 * LoginPage actions
 *
 */

import { LOGIN_ACTION } from './constants';

export function loginAction(username, password) {
  return {
    type: LOGIN_ACTION,
    username,
    password,
  };
}

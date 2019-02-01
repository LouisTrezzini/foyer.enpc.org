/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import { success } from 'redux-saga-requests';
import { LOGIN_ACTION, LOGOUT_ACTION } from '../constants';

export const initialState = fromJS({
  isAuthenticated: false,
  token: null,
  authData: null,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case success(LOGIN_ACTION):
      return state
        .set('isAuthenticated', true)
        .set('token', action.payload.data.token)
        .set('authData', action.payload.data.data);
    case LOGOUT_ACTION:
      return state
        .set('isAuthenticated', false)
        .set('token', null)
        .set('authData', null);
    default:
      return state;
  }
}

export default authReducer;

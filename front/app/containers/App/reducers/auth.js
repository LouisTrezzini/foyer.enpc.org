/*
 *
 * App reducer
 *
 */

import produce from 'immer';
import { success } from 'redux-saga-requests';
import { LOGIN_ACTION, LOGOUT_ACTION } from '../constants';

export const initialState = {
  isAuthenticated: false,
  token: null,
  authData: null,
};

/* eslint-disable default-case, no-param-reassign */
const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case success(LOGIN_ACTION):
        draft.isAuthenticated = true;
        draft.token = action.payload.data.token;
        draft.authData = action.payload.data.data;
        break;
      case LOGOUT_ACTION:
        draft.isAuthenticated = false;
        draft.token = null;
        draft.authData = null;
        break;
    }
  });

export default authReducer;

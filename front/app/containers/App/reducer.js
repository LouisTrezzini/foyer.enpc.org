/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import { LOGOUT_ACTION } from './constants';

export const initialState = fromJS({
  auth: {
    isConnected: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_ACTION:
      return state.setIn(['auth', 'isConnected'], false);
    default:
      return state;
  }
}

export default appReducer;

/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { connectRouter } from 'connected-react-router/immutable';
import appReducer from 'containers/App/reducers';
import authReducer from 'containers/App/reducers/auth';
import { combineReducers } from 'redux-immutable';
import { reducer as thunkReducer } from 'redux-saga-thunk';

import history from 'utils/history';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    app: appReducer,
    auth: authReducer,
    router: connectRouter(history),
    thunk: thunkReducer,
    ...injectedReducers,
  });
}

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the privateRoute state domain
 */

const selectPrivateRouteDomain = state =>
  state.get('privateRoute', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PrivateRoute
 */

const makeSelectPrivateRoute = () =>
  createSelector(selectPrivateRouteDomain, substate => substate.toJS());

export default makeSelectPrivateRoute;
export { selectPrivateRouteDomain };

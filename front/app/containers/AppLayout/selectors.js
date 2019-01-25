import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the appLayout state domain
 */

const selectAppLayoutDomain = state => state.get('appLayout', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AppLayout
 */

const makeSelectAppLayout = () =>
  createSelector(selectAppLayoutDomain, substate => substate.toJS());

export default makeSelectAppLayout;
export { selectAppLayoutDomain };

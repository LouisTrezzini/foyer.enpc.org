import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the topUpPage state domain
 */

const selectTopUpPageDomain = state => state.get('topUpPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TopUpPage
 */

const makeSelectTopUpPage = () =>
  createSelector(selectTopUpPageDomain, substate => substate.toJS());

export default makeSelectTopUpPage;
export { selectTopUpPageDomain };

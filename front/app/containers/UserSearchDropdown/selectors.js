import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userSearchDropdown state domain
 */

const selectUserSearchDropdownDomain = state =>
  state.get('userSearchDropdown', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserSearchDropdown
 */

const makeSelectUserSearchDropdown = () =>
  createSelector(selectUserSearchDropdownDomain, substate => substate.toJS());

export default makeSelectUserSearchDropdown;
export { selectUserSearchDropdownDomain };

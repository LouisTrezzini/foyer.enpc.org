import { createSelector } from 'reselect';

/**
 * Direct selector to the userSearchDropdown state domain
 */

const selectUserSearchDropdownDomain = state => state.get('userSearchDropdown');

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserSearchDropdown
 */

const makeSelectUserSearchDropdownResults = () =>
  createSelector(
    selectUserSearchDropdownDomain,
    substate => (substate.data ? substate.data.users : []),
  );

const makeSelectUserSearchDropdownIsLoading = () =>
  createSelector(
    selectUserSearchDropdownDomain,
    substate => substate.pending > 0,
  );

export {
  makeSelectUserSearchDropdownResults,
  makeSelectUserSearchDropdownIsLoading,
};

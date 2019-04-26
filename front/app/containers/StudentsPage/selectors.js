import { createSelector } from 'reselect';

/**
 * Direct selector to the studentPage state domain
 */

const selectStudentPageDomain = state => state.studentPage;

/**
 * Other specific selectors
 */

const makeSelectStudentPageIsLoading = () =>
  createSelector(
    selectStudentPageDomain,
    substate => substate.pending > 0,
  );

const makeSelectStudentPageStudent = () =>
  createSelector(
    selectStudentPageDomain,
    substate => {
      if (!substate.data) {
        return null;
      }
      return substate.data[0];
    },
  );

const makeSelectStudentPageTransactions = () =>
  createSelector(
    selectStudentPageDomain,
    substate => {
      if (!substate.data) {
        return null;
      }
      return substate.data[1];
    },
  );

export {
  makeSelectStudentPageIsLoading,
  makeSelectStudentPageStudent,
  makeSelectStudentPageTransactions,
};

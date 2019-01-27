import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the studentPage state domain
 */

const selectStudentPageDomain = state => state.get('studentPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentsPage
 */

const makeSelectStudentPage = () =>
  createSelector(selectStudentPageDomain, substate => substate.toJS());

export default makeSelectStudentPage;
export { selectStudentPageDomain };

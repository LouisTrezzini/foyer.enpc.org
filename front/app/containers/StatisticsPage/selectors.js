import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the statisticsPage state domain
 */

const selectStatisticsPageDomain = state =>
  state.get('statisticsPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by StatisticsPage
 */

const makeSelectStatisticsPage = () =>
  createSelector(selectStatisticsPageDomain, substate => substate.toJS());

export default makeSelectStatisticsPage;
export { selectStatisticsPageDomain };

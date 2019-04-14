import { createSelector } from 'reselect';

/**
 * Direct selector to the topUpPage state domain
 */

const selectTopUpPageDomain = state => state.get('topUpPage');

/**
 * Other specific selectors
 */

const makeSelectTopUpPageIsLoading = () =>
  createSelector(
    selectTopUpPageDomain,
    substate => substate.pending > 0,
  );

const makeSelectTopUpPageIsDimmed = () =>
  createSelector(
    selectTopUpPageDomain,
    substate => substate.isDimmed || false,
  );

const makeSelectTopUpPageMeta = () =>
  createSelector(
    selectTopUpPageDomain,
    substate => substate.meta || {},
  );


export { makeSelectTopUpPageIsDimmed, makeSelectTopUpPageIsLoading, makeSelectTopUpPageMeta };

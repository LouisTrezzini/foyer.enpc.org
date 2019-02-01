import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRouter = state => state.get('router');

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const selectApp = state => state.get('app', initialState);

const selectAuth = createSelector(selectApp, app => app.get('auth'));

const makeSelectAuth = () =>
  createSelector(selectAuth, substate => substate.toJS());

export { makeSelectLocation, makeSelectAuth };

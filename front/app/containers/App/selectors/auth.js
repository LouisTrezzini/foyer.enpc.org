import { createSelector } from 'reselect';
import { initialState } from '../reducers/auth';

const selectAuth = state => state.auth || initialState;

const makeSelectAuth = () =>
  createSelector(
    selectAuth,
    auth => auth,
  );

const makeSelectIsAuthenticated = () =>
  createSelector(
    selectAuth,
    auth => auth.isAuthenticated,
  );

const makeSelectAuthToken = () =>
  createSelector(
    selectAuth,
    auth => auth.token,
  );

export { makeSelectAuth, makeSelectIsAuthenticated, makeSelectAuthToken };

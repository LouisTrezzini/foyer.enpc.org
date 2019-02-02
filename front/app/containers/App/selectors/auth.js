import { createSelector } from 'reselect';
import { initialState } from '../reducers/auth';

const selectAuth = state => state.get('auth', initialState);

const makeSelectAuth = () => createSelector(selectAuth, auth => auth.toJS());

const makeSelectIsAuthenticated = () =>
  createSelector(selectAuth, auth => auth.get('isAuthenticated'));

const makeSelectAuthToken = () =>
  createSelector(selectAuth, auth => auth.get('token'));

export { makeSelectAuth, makeSelectIsAuthenticated, makeSelectAuthToken };

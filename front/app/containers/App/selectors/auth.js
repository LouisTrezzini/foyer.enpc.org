import { createSelector } from 'reselect';
import { initialState } from '../reducers/auth';

const selectAuth = state => state.get('auth', initialState);

const makeSelectAuth = () =>
  createSelector(selectAuth, substate => substate.toJS());

export { makeSelectAuth };

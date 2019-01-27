import { fromJS } from 'immutable';
import statisticsPageReducer from '../reducer';

describe('statisticsPageReducer', () => {
  it('returns the initial state', () => {
    expect(statisticsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

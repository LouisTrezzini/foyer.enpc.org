import { fromJS } from 'immutable';
import studentPageReducer from '../reducer';

describe('studentPageReducer', () => {
  it('returns the initial state', () => {
    expect(studentPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

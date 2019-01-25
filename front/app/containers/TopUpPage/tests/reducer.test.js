import { fromJS } from 'immutable';
import topUpPageReducer from '../reducer';

describe('topUpPageReducer', () => {
  it('returns the initial state', () => {
    expect(topUpPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

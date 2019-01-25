import { fromJS } from 'immutable';
import appLayoutReducer from '../reducer';

describe('appLayoutReducer', () => {
  it('returns the initial state', () => {
    expect(appLayoutReducer(undefined, {})).toEqual(fromJS({}));
  });
});

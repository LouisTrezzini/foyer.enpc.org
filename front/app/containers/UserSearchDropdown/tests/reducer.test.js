import { fromJS } from 'immutable';
import userSearchDropdownReducer from '../reducer';

describe('userSearchDropdownReducer', () => {
  it('returns the initial state', () => {
    expect(userSearchDropdownReducer(undefined, {})).toEqual(fromJS({}));
  });
});

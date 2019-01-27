import { fromJS } from 'immutable';
import drinksPageReducer from '../reducer';

describe('drinksPageReducer', () => {
  it('returns the initial state', () => {
    expect(drinksPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

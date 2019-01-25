import { fromJS } from 'immutable';
import transactionsPageReducer from '../reducer';

describe('transactionsPageReducer', () => {
  it('returns the initial state', () => {
    expect(transactionsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

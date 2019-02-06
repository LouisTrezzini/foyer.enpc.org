import { fromJS } from 'immutable';
import deleteTransactionButtonReducer from '../reducer';

describe('deleteTransactionButtonReducer', () => {
  it('returns the initial state', () => {
    expect(deleteTransactionButtonReducer(undefined, {})).toEqual(fromJS({}));
  });
});

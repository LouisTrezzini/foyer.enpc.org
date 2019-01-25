import { fromJS } from 'immutable';

import languageProviderReducer from '../reducer';

describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {})).toEqual(
      fromJS({
        locale: 'en',
      }),
    );
  });
});

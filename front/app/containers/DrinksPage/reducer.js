/*
 *
 * DrinksPage reducer
 *
 */

import { requestsReducer } from 'redux-saga-requests';
import { FETCH_DRINKS } from './constants';

export default requestsReducer({ actionType: FETCH_DRINKS, multiple: true });

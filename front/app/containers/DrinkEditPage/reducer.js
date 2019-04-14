/*
 *
 * DrinksPage reducer
 *
 */

import { requestsReducer } from 'redux-saga-requests';
import { FETCH_DRINK } from './constants';

export default requestsReducer({ actionType: FETCH_DRINK });

/*
 *
 * StudentsPage reducer
 *
 */

import { requestsReducer } from 'redux-saga-requests';
import { FETCH_STUDENT } from './constants';

export default requestsReducer({ actionType: FETCH_STUDENT });

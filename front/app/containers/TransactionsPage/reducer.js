/*
 *
 * TransactionsPage reducer
 *
 */

import { requestsReducer } from 'redux-saga-requests';
import { FETCH_TRANSACTIONS } from './constants';

export default requestsReducer({ actionType: FETCH_TRANSACTIONS });

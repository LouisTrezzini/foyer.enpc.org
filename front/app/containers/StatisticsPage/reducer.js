/*
 *
 * StatisticsPage reducer
 *
 */

import { requestsReducer } from 'redux-saga-requests';
import { FETCH_STATISTICS } from './constants';

export default requestsReducer({
  actionType: FETCH_STATISTICS,
});

/*
 *
 * UserSearchDropdown reducer
 *
 */

import { requestsReducer } from 'redux-saga-requests';
import { SEARCH_USER } from './constants';

export default requestsReducer({ actionType: SEARCH_USER });

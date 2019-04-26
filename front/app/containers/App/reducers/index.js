/*
 *
 * App reducer
 *
 */

import { produce } from 'immer';

export const initialState = {};

const appReducer = (state = initialState) => produce(state, () => {});

export default appReducer;

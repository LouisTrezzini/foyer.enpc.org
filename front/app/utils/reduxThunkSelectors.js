import find from 'lodash/find';
import pick from 'lodash/pick';

const PENDING = 'pending';
const REJECTED = 'rejected';
const FULFILLED = 'fulfilled';
const DONE = 'done';

const initialState = {
  [PENDING]: {},
  [REJECTED]: {},
  [FULFILLED]: {},
  [DONE]: {},
};

const getIn = (state, name, id) => {
  if (typeof name === 'undefined') {
    return !!find(state, value => !!value);
  }
  if (Array.isArray(name)) {
    const names = name.map(n => (Array.isArray(n) ? n[0] : n));
    const nameToIdMap = name.reduce((prev, curr) => {
      if (Array.isArray(curr)) {
        return Object.assign({}, prev, { [curr[0]]: curr[1] });
      }
      return prev;
    }, {});

    return !!find(pick(state, names), (value, key) => {
      if (typeof nameToIdMap[key] === 'undefined') {
        return !!value;
      }

      return typeof value === 'object' ? !!value[nameToIdMap[key]] : false;
    });
  }
  if (Object.prototype.hasOwnProperty.call(state, name)) {
    if (typeof id === 'undefined') {
      return !!state[name];
    }
    return typeof state[name] === 'object' ? !!state[name][id] : false;
  }
  return false;
};

const getThunkState = (state = {}) => {
  return state.thunk || {};
};

export const getPendingState = state =>
  getThunkState(state)[PENDING] || initialState[PENDING];

export const getRejectedState = state =>
  getThunkState(state)[REJECTED] || initialState[REJECTED];

export const getFulfilledState = state =>
  getThunkState(state)[FULFILLED] || initialState[FULFILLED];

export const getDoneState = state =>
  getThunkState(state)[DONE] || initialState[DONE];

export const pending = (state, name, id) =>
  getIn(getPendingState(state), name, id);

export const rejected = (state, name, id) =>
  getIn(getRejectedState(state), name, id);

export const fulfilled = (state, name, id) =>
  getIn(getFulfilledState(state), name, id);

export const done = (state, name, id) => getIn(getDoneState(state), name, id);

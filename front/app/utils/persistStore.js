export const STORAGE_KEY = 'app_auth';

export function loadState(initialState = {}) {
  try {
    const persistedState = localStorage.getItem(STORAGE_KEY);
    if (persistedState === null) {
      return initialState;
    }

    return {
      ...initialState,
      ...JSON.parse(persistedState),
    };
  } catch (e) {
    return initialState;
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify({
      auth: state.get('auth'),
    });
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}

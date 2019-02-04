import axios from 'axios';
import { logoutAction } from 'containers/App/actions';
import { makeSelectAuthToken } from 'containers/App/selectors/auth';
import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';
import { put, select } from 'redux-saga/effects';

const axiosInstance = axios.create({
  // baseURL: 'https://upont.enpc.fr/api',
  baseURL: 'http://localhost:10101/api',
});

const attachAuthToken = (request, token) => {
  if (request.url.startsWith('/') && !request.url.startsWith('/login')) {
    const headers = request.headers || {};
    headers.Authorization = `Bearer ${token}`;
    request.headers = headers;
  }

  return request;
};

function* onRequestSaga(request) {
  const token = yield select(makeSelectAuthToken());

  if (Array.isArray(request)) {
    return request.map(req => attachAuthToken(req, token));
  } else {
    return attachAuthToken(request, token);
  }
}

function* onErrorSaga(error) {
  if (error.response.status === 401) {
    yield put(logoutAction());
  }

  // not related token error, we pass it like nothing happened
  return { error };
}

export default function* appSaga() {
  yield createRequestInstance({
    driver: createDriver(axiosInstance),
    onRequest: onRequestSaga,
    onError: onErrorSaga,
  });
  yield watchRequests();
}

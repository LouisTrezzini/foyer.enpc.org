import axios from 'axios';
import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';

const axiosInstance = axios.create({
  baseURL: 'https://upont.enpc.fr/api',
});

export default function* appSaga() {
  yield createRequestInstance({
    driver: createDriver(axiosInstance),
  });
  yield watchRequests();
}

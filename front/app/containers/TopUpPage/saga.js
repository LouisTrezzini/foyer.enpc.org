import { openSuccessDimmerAction } from 'containers/TopUpPage/actions';
import { TOP_UP } from 'containers/TopUpPage/constants';
import { success } from 'redux-saga-requests';
import { put, takeLatest } from 'redux-saga/effects';

function* topUpSuccessSaga(action) {
  yield put(openSuccessDimmerAction(action.meta));
}

export default function* topUpPageSaga() {
  yield takeLatest(success(TOP_UP), topUpSuccessSaga);
}

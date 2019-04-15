import {
  fetchRecentTransactionsAction,
  resetCheckoutAction,
} from 'containers/CheckoutPage/actions';
import { CHECKOUT } from 'containers/CheckoutPage/constants';
import { success } from 'redux-saga-requests';
import { put, takeLatest } from 'redux-saga/effects';

function* checkoutSuccessSaga() {
  yield put(resetCheckoutAction());
  yield put(fetchRecentTransactionsAction());
}

export default function* checkoutPageSaga() {
  yield takeLatest(success(CHECKOUT), checkoutSuccessSaga);
}

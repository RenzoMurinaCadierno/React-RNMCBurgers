import { takeEvery, all, takeLatest } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import { 
  logoutSaga, checkAuthTimeoutSaga, authInitSaga, authCheckStateSaga 
} from './auth'
import { loadIngredientsSaga } from './burgerBuilder'
import { purchasePostStartSaga, fetchOrderInitSaga } from './order'

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_LOGOUT_INIT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INIT, authInitSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ])
}

export function* watchBurgerBuilder() {
  yield takeEvery(
    actionTypes.LOAD_INGREDIENTS_INIT, loadIngredientsSaga
  )
}

export function* watchOrder() {
  yield takeLatest(
    actionTypes.PURCHASE_POST_START, purchasePostStartSaga
  )
  yield takeEvery(
    actionTypes.FETCH_ORDERS_INIT, fetchOrderInitSaga
  )
}
import { put } from 'redux-saga/effects'
import * as actionCreators from '../actions/index'
import axios from '../../axios-orders'

export function* purchasePostStartSaga({ payload: {idToken, orderData }}) {

  yield put(actionCreators.purchaseStart())

  try {
    const res = yield axios.post(
      `/orders.json?auth=${idToken}`, 
      orderData
    )
    yield put(actionCreators.purchaseSuccess(
      res.data.name, orderData
    ))

  } catch (err) {
    yield put(actionCreators.purchaseFailed(err))
  }
}

export function* fetchOrderInitSaga({ payload: { idToken, userId } }) {

  yield put(actionCreators.fetchOrderStart())

  try {
    const queryParams = '?auth=' + idToken + 
      '&orderBy="userId"&equalTo="' + userId + '"'

    const res = yield axios.get(`/orders.json${queryParams}`)

    const retrievedOrders = []

    for (let key in res.data) {
      retrievedOrders.push({
        ...res.data[key],
        id: key
      })
    }

    yield put(actionCreators.fetchOrderSuccess(retrievedOrders))

  } catch (err) {
    
    yield put(actionCreators.fetchOrderFailed(err))
  }
}
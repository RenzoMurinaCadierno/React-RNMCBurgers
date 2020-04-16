import * as actionTypes from './actionTypes'

export const purchaseSuccess = (id, orderData) => {
  return { 
    type: actionTypes.PURCHASE_SUCCESS, 
    payload: { id, orderData }
  }
}

export const purchaseFailed = err => {
  return {
    type: actionTypes.PURCHASE_FAILED,
    payload: err
  }
}

export const purchaseStart = () => {
  return { type: actionTypes.PURCHASE_START }
}

export const purchasePostStart = (idToken, orderData) => {
  console.log(idToken, orderData)
  return {
    type: actionTypes.PURCHASE_POST_START,
    payload: { idToken, orderData }
  }
}

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT }
}

export const fetchOrderSuccess = retrievedOrders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: retrievedOrders
  }
}

export const fetchOrderFailed = error => {
  return { 
    type: actionTypes.FETCH_ORDERS_FAILED,
    payload: error
  }
}

export const fetchOrderStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START }
}

export const fetchOrderInit = (idToken, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
    payload: { idToken, userId }
  }
}
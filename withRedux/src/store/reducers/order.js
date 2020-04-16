import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../utility/utility'

const initialState = {
  orders: [],
  isLoading: false,
  isPurchasing: false
}

const purchaseSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    isPurchasing: true,
    orders: state.orders.concat(
      ...state.orders,
      action.payload.id,
      action.payload.orderData
    )
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { isPurchasing: false })
    
    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { isPurchasing: true, isLoading: true })
    
    case actionTypes.PURCHASE_START:
      return updateObject(state, { isLoading: true })

    case actionTypes.PURCHASE_SUCCESS:
      return purchaseSuccess(state, action)

    case actionTypes.FETCH_ORDERS_FAILED:
    case actionTypes.PURCHASE_FAILED:
      return updateObject(state, { isLoading: false })

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(
        state, 
        { orders: action.payload, isLoading: false }
      )
    default:
      return state
  }
}

export default reducer
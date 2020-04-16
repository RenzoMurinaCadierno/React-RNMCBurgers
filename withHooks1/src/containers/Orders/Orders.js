import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreators from '../../store/actions/index'

const Orders = props => {

  const { 
    idToken, onFetchOrderInit, userId, orders, isLoading 
  } = props

  useEffect(() => {
    onFetchOrderInit(idToken, userId)
  }, [idToken, onFetchOrderInit, userId])

  let renderOrders = <Spinner />

  if (!isLoading) {
    renderOrders = orders.map( order => {
      return <Order 
        key={ order.id } 
        ingredients={ order.ingredients }
        price={ order.price }
      />
    })
  }
    
  return <div> { renderOrders }</div>
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    isLoading: state.order.isLoading,
    idToken: state.auth.idToken,
    userId : state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrderInit: (idToken, userId) => (
      dispatch(actionCreators.fetchOrderInit(idToken, userId))
    )
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(withErrorHandler(Orders, axios))
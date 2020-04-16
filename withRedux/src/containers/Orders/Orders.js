import React, { Component } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreators from '../../store/actions/index'

class Orders extends Component {

  componentDidMount() {
    const { idToken, onFetchOrderInit, userId } = this.props
    onFetchOrderInit(idToken, userId)
  }

  render() {
    const { orders, isLoading } = this.props

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
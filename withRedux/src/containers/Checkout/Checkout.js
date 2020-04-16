import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CkeckoutSummary'
import ContactData from '../ContactData/ContactData'

class Checkout extends Component {

  checkoutCancel = () => {
    this.props.history.goBack()
  }

  checkoutSuccess = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {

    const { match, ingredients, isPurchasing } = this.props

    let summary = <Redirect to='/' />

    if (ingredients) {

      const redirect = isPurchasing
        ? <Redirect to='/' />
        : null

      summary = (
        <div>
          { redirect }
          <CheckoutSummary 
            ingredients={ ingredients } 
            checkoutCancel={ this.checkoutCancel }
            checkoutSuccess={ this.checkoutSuccess }
          />
          <Route 
            path={ match.path + '/contact-data' } 
            component={ ContactData }
          /> 
        </div>
      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    isPurchasing: state.order.isPurchasing
  }
}

export default connect(mapStateToProps)(Checkout)

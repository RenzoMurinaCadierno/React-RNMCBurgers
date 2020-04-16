import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CkeckoutSummary'
import ContactData from '../ContactData/ContactData'

const Checkout = props => {

  const { 
    history, match, ingredients, isPurchasing 
  } = props

  const checkoutCancel = () => {
    history.goBack()
  }

  const checkoutSuccess = () => {
    history.replace('/checkout/contact-data')
  }

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
          checkoutCancel={ checkoutCancel }
          checkoutSuccess={ checkoutSuccess }
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


const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    isPurchasing: state.order.isPurchasing
  }
}

export default connect(mapStateToProps)(Checkout)

import React from 'react'

import EmptyWrapper from '../../../hoc/EmptyWrapper/EmptyWrapper'
import Button from '../../UI/Button/Button'

const OrderSummary = props => {

  const { 
    ingredients, totalPrice, checkoutSuccess, cancelModal 
  } = props
  
  const ingredientSummary = Object
    .keys(ingredients)
    .map(ingKey => {
    return (
      <li key={ ingKey }> 
        <span style={{ textTransform: 'capitalize' }}>{ ingKey }</span>: { ingredients[ingKey] } 
      </li>
    )
  })

  return (
    <EmptyWrapper>
      <h3> Your burger </h3>
      <p> A personalized masterpiece with: </p>
      <ul>
        { ingredientSummary }
      </ul>
      <p><strong> Total: $ { totalPrice.toFixed(2) }</strong></p>
      <p> Check it out and start tasting it! </p>
      <Button 
        btnType='Danger' customButtonClick={ cancelModal }
      > 
        Cancel 
      </Button>
      <Button 
        btnType='Success' customButtonClick={ checkoutSuccess }
      > 
        Checkout 
      </Button>
    </EmptyWrapper>
  )
}


export default OrderSummary
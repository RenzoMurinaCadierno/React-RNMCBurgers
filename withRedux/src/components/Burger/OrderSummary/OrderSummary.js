import React, { Component } from 'react'

import EmptyWrapper from '../../../hoc/EmptyWrapper/EmptyWrapper'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

  // triggers each time an ingredient is added
  // componentWillUpdate() {
  //   console.log('[OrderSummary] will update.')
  // }

  render() {
    const { 
      ingredients, totalPrice, checkoutSuccess, cancelModal 
    } = this.props
    
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
}

export default OrderSummary
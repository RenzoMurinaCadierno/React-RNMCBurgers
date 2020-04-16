import React from 'react'

import BuildControl from './BuildControl/BuildControl'

import styles from './BuildControls.module.css'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buildControls = ({ 
  handleAddIngredient, handleRemoveIngredient, handleCheckout,
  totalPrice, disabled, purchasable, isAuthenticated
}) => (
  <div className={ styles.BuildControls }>
    <p> Price: <strong> $ { totalPrice.toFixed(2) } </strong> </p>
    {
      controls.map( ctrl => (
        <BuildControl 
          key={ ctrl.label } 
          label={ ctrl.label }
          handleAddIngredient={ () => handleAddIngredient(ctrl.type) }
          handleRemoveIngredient={ () => handleRemoveIngredient(ctrl.type) }
          disabled={ disabled[ctrl.type] }
        />
      ))
    }
    <button 
      className={ styles.OrderButton }
      disabled={ !purchasable }
      onClick={ handleCheckout }
    > 
      {
        isAuthenticated
          ? 'Get your burger!'
          : 'Log in to continue'
      }
    </button> 
  </div>
)

export default buildControls
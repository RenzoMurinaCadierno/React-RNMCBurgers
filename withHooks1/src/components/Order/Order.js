import React from 'react'

import styles from './Order.module.css'

const order = ({ ingredients, price }) => {

  const transformedIngredients = []

  for (let ingredient in ingredients) {
    transformedIngredients.push({
      name: ingredient,
      amount: ingredients[ingredient]
    })
  }

  const ingredientsToRender = transformedIngredients.map(ingredient => {
    return <span key={ ingredient.name }> 
      { ingredient.name } ({ ingredient.amount }) 
    </span>
  })
  
  return (
    <div className={ styles.Order }>
      <p> Ingredients: </p>
      <p> { ingredientsToRender } </p>
      <p> Total price: <strong> $ { 
        Number.parseFloat(price).toFixed(2)
        } </strong>
      </p>
    </div>
  )
}

export default order
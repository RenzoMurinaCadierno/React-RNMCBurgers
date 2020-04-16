import React from 'react'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

import styles from './Burger.module.css'

const burger = ({ ingredients }) => {

  let transformedIngredients = Object
    .keys(ingredients)
    .map(ingKey => {
      return [...Array(ingredients[ingKey])].map( (_, i) => {
        return <BurgerIngredient key={ ingKey + i} type={ ingKey } />
      })
    })
    .reduce((accumulator, ingredientArray) =>{
      return accumulator.concat(ingredientArray)
    }, [])

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p> Build your burger up! </p>
  }

  return (
    <div className={ styles.Burger }>
      <BurgerIngredient type='bread-top' />
      { transformedIngredients }
      <BurgerIngredient type='bread-bottom' />
    </div>
  )
}

export default burger
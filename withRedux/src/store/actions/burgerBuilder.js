import * as actionTypes from './actionTypes'

export const addIngredient = ingName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: ingName
  }
}

export const removeIngredient = ingName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: ingName
  }
}

export const renderIngredients = ingredients => {
  return {
    type: actionTypes.RENDER_INGREDIENTS,
    payload: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return { type: actionTypes.FETCH_INGREDIENTS_FAILED }
}

export const loadIngredients = () => {
  return { type: actionTypes.LOAD_INGREDIENTS_INIT }
}
import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../utility/utility'

const initialState = {
  ingredients: null,
  totalPrice: 1.1,
  hasError: false,
  isBuilding: false
}

const addIngredient = (state, action) => {
  updatedIngredient = { 
    [action.payload]: state.ingredients[action.payload] + 1 
  }
  updatedIngredients = updateObject(
    state.ingredients, updatedIngredient
  )
  updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
    isBuilding: true
  }
  return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
  updatedIngredient = { 
    [action.payload]: state.ingredients[action.payload] - 1 
  }
  updatedIngredients = updateObject(
    state.ingredients, updatedIngredient
  )
  updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
    isBuilding: true,
  }
  return updateObject(state, updatedState)
}

const renderIngredients = (state, action) => {
  return updateObject(
    state, {
      ingredients: {
        salad: action.payload.salad,
        bacon: action.payload.bacon,
        cheese: action.payload.cheese,
        meat: action.payload.meat
      },
      totalPrice: 1.1,
      hasError: false, 
      isBuilding: false
    }
  )
}

const INGREDIENT_PRICES = {
  salad: 0.6, cheese: 0.7, meat: 1.1, bacon: 0.9
}

let updatedIngredient, updatedIngredients, updatedState

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
    case actionTypes.RENDER_INGREDIENTS: return renderIngredients(state, action)
    case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, { hasError: true })
    default: return state
  }
}

export default reducer
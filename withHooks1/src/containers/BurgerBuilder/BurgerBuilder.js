import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import EmptyWrapper from '../../hoc/EmptyWrapper/EmptyWrapper'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import * as actionCreators from '../../store/actions/index'

const BurgerBuilder = props => {

  const { history } = props

  const [isCheckingOut, setIsCheckingOut ] = useState(false)

  const dispatch = useDispatch()

  const ingredients = useSelector(state => {
    return state.burgerBuilder.ingredients
  })
  const totalPrice = useSelector(state => {
    return state.burgerBuilder.totalPrice
  })
  const hasError = useSelector(state => {
    return state.burgerBuilder.hasError
  })
  const isAuthenticated = useSelector(state => {
    return state.auth.idToken !== null
  })

  const onAddIngredient = ingName => (
    dispatch(actionCreators.addIngredient(ingName))
  )
  const onRemoveIngredient = ingName => (
    dispatch(actionCreators.removeIngredient(ingName))
  )
  // this one is a special case. Since onLoadIngredients() is
  // a dependency of useEffect() below, then it will re-create
  // infinitely on component rendering. That's why we cache the
  // value with useCallback()
  const onLoadIngredients = useCallback(() => (
    dispatch(actionCreators.loadIngredients())
  ), [dispatch])
  const onPurchaseInit = () => (
    dispatch(actionCreators.purchaseInit())
  )
  const onSetAuthRedirectPath = path => {
    dispatch(actionCreators.setAuthRedirectPath(path))
  }

  useEffect(() => {
    onLoadIngredients()
  }, [onLoadIngredients])

  const handleUpdatePurchase = ingredients => {
    const sum = Object
      .keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey]
      })
      .reduce( (accumulator, currIngredientQty) => {
        return accumulator + currIngredientQty
      }, 0)

    return sum > 0
  }

  const handleCheckout = ()  => {

    if (isAuthenticated) {
      setIsCheckingOut(true)
    } else {
      onSetAuthRedirectPath('/checkout')
      history.push('/auth')
    }
  }

  const handleCancelModal = () => {
    setIsCheckingOut(false)
  }

  const handleCheckoutSuccess = () => {
    onPurchaseInit()
    history.push('/checkout')
  }

  const disabledInfo = { ...ingredients }

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null

  let burgerAndBuildControls = hasError 
    ? <p> Cannot load ingredients. Please try again later :) </p>
    : <Spinner />

  if (ingredients) {

    burgerAndBuildControls = (
      <EmptyWrapper>
        <Burger ingredients={ ingredients }/>
        <BuildControls 
          handleAddIngredient={ onAddIngredient }
          handleRemoveIngredient={ onRemoveIngredient }
          handleCheckout={ handleCheckout }
          disabled={ disabledInfo }
          totalPrice={ totalPrice }
          purchasable={ handleUpdatePurchase(ingredients) }
          isAuthenticated={ isAuthenticated }
        />
      </EmptyWrapper>
    )

    orderSummary = (
      <OrderSummary 
        ingredients={ ingredients } 
        totalPrice={ totalPrice }
        checkoutSuccess={ handleCheckoutSuccess }
        cancelModal={ handleCancelModal }
      />
    )
  }

  return (
    <EmptyWrapper>
      <Modal show={ isCheckingOut } cancelModal={ handleCancelModal }> 
        { orderSummary }
      </Modal>
      { burgerAndBuildControls }
    </EmptyWrapper>
  )
}

export default (withErrorHandler(BurgerBuilder, axios))
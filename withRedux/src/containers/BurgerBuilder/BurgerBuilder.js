import React, { Component } from 'react'
import { connect } from 'react-redux'

import EmptyWrapper from '../../hoc/EmptyWrapper/EmptyWrapper'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import * as actionCreators from '../../store/actions/index'

export class BurgerBuilder extends Component {

  state = { isCheckingOut: false }

  componentDidMount() {
    this.props.onLoadIngredients()
  }

  handleUpdatePurchase = ingredients => {
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

  handleCheckout = ()  => {
    const { 
      history, isAuthenticated, onSetAuthRedirectPath 
    } = this.props

    if (isAuthenticated) {
      this.setState({ isCheckingOut: true })
    } else {
      onSetAuthRedirectPath('/checkout')
      history.push('/auth')
    }
  }

  handleCancelModal = () => {
    this.setState({ isCheckingOut: false })
  }

  handleCheckoutSuccess = () => {
    this.props.onPurchaseInit()
    this.props.history.push('/checkout')
  }

  render() {
    const { isCheckingOut } = this.state

    const { 
      ingredients, onAddIngredient, onRemoveIngredient,
      totalPrice, hasError, isAuthenticated
    } = this.props

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
            handleCheckout={ this.handleCheckout }
            disabled={ disabledInfo }
            totalPrice={ totalPrice }
            purchasable={ this.handleUpdatePurchase(ingredients) }
            isAuthenticated={ isAuthenticated }
          />
        </EmptyWrapper>
      )

      orderSummary = (
        <OrderSummary 
          ingredients={ ingredients } 
          totalPrice={ totalPrice }
          checkoutSuccess={ this.handleCheckoutSuccess }
          cancelModal={ this.handleCancelModal }
        />
      )
    }

    return (
      <EmptyWrapper>
        <Modal show={ isCheckingOut } cancelModal={ this.handleCancelModal }> 
          { orderSummary }
        </Modal>
        { burgerAndBuildControls }
      </EmptyWrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    hasError: state.burgerBuilder.hasError,
    isAuthenticated: state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingName => (
      dispatch(actionCreators.addIngredient(ingName))
    ),
    onRemoveIngredient: ingName => (
      dispatch(actionCreators.removeIngredient(ingName))
    ),
    onLoadIngredients: () => (
      dispatch(actionCreators.loadIngredients())
    ),
    onPurchaseInit: () => (
      dispatch(actionCreators.purchaseInit())
    ),
    onSetAuthRedirectPath: path => {
      dispatch(actionCreators.setAuthRedirectPath(path))
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
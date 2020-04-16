import React, { useState } from 'react'
import { connect } from 'react-redux'

import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreators from '../../store/actions/index'

import { updateObject, checkValidity } from '../../utility/utility'
import styles from './ContactData.module.css'

const ContactData = props => {

  const { 
    ingredients, totalPrice, onSubmitOrder, idToken, 
    userId, isLoading 
  } = props

  const [orderForm, setOrderForm] = useState({
    name: {
      elemType: 'input',
      elemConfig: {
        type: 'text',
        placeholder: 'Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elemType: 'input',
      elemConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elemType: 'input',
      elemConfig: {
        type: 'text',
        placeholder: 'Zip Code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elemType: 'input',
      elemConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elemType: 'input',
      elemConfig: {
        type: 'email',
        placeholder: 'Email'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elemType: 'select',
      elemConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'fast', displayValue: 'Fast' },
          { value: 'normal', displayValue: 'Normal' },
        ]
      },
      value: 'fastest', 
      validation: {}, 
      valid: true  
    }             
  })

  const [formIsValid, setFormIsValid] = useState(false)

  const handleSubmitOrder = e => {
    e.preventDefault()

    const formData = {}

    for (let formIdKey in orderForm) {
      formData[formIdKey] = orderForm[formIdKey].value
    }

    const orderData = {
      ingredients,
      price: totalPrice,
      orderData: formData,
      userId
    }

    onSubmitOrder(idToken, orderData)
  }

  const handleChange = ({ target: { value } }, inputIdKey) => {

    const formElementCopy = updateObject(
      orderForm[inputIdKey],
      {
        value,
        valid: checkValidity(
          value, orderForm[inputIdKey].validation
        ),
        touched: true,
      } 
    )
    const orderFormCopy = updateObject(
      orderForm, { [inputIdKey]: formElementCopy }
    )

    let formIsValid = true
    for (let inputIdKey in orderFormCopy) {
      formIsValid = orderFormCopy[inputIdKey].valid && formIsValid
    }

    setOrderForm(orderFormCopy)
    setFormIsValid(formIsValid)
  }

  const formElements = []

  for (let key in orderForm) {
    formElements.push({
      id: key,
      config: orderForm[key]
    })
  }

  let form = (
    <form onSubmit={ handleSubmitOrder }>
      { 
        formElements.map(formElem => (
          <Input 
            key={ formElem.id }
            elemType={ formElem.config.elemType } 
            elemConfig={ formElem.config.elemConfig } 
            value={ formElem.config.value }
            invalid={ !formElem.config.valid }
            shouldValdiate={ formElem.config.validation }
            touched={ formElem.config.touched }
            change={ e => handleChange(e, formElem.id) } 
          />
        ))
      }
      <Button btnType='Success' disabled={ !formIsValid }> 
        Get me the burger! 
      </Button>
    </form>
  )

  if (isLoading) form = <Spinner />

  return(
    <div className={ styles.ContactData }>
      <h4> Enter your contact data </h4>
      { form }
    </div>
  )
}


const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isLoading: state.order.isLoading,
    idToken: state.auth.idToken,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitOrder: (idToken, orderData) => (
      dispatch(actionCreators.purchasePostStart(idToken, orderData))
    )
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(withErrorHandler(ContactData, axios))
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreators from '../../store/actions/index'

import { updateObject, checkValidity } from '../../utility/utility'
import styles from './ContactData.module.css'

class ContactData extends Component {

  state = {
    orderForm: {
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
        value: 'fastest', // initial value to avoid bugged default submit
        validation: {}, // should exist for this below vvv
        valid: true  // should always be true for the
      }              // check in handleChange 'formIsValid'
    },
    formIsValid: false
  }

  handleSubmitOrder = e => {
    e.preventDefault()

    const { 
      ingredients, totalPrice, onSubmitOrder, idToken, userId 
    } = this.props
    const { orderForm } = this.state

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

  handleChange = ({ target: { value } }, inputIdKey) => {
    const { orderForm } = this.state

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
    //
    // const orderFormCopy = { ...orderForm }
    // const formElementCopy = { ...orderFormCopy[inputIdKey] }
    //
    // formElementCopy.value = value
    // formElementCopy.valid = this.checkValidity(
    //   formElementCopy.value, formElementCopy.validation
    // )
    // formElementCopy.touched = true
    // orderFormCopy[inputIdKey] = formElementCopy

    let formIsValid = true
    for (let inputIdKey in orderFormCopy) {
      formIsValid = orderFormCopy[inputIdKey].valid && formIsValid
    }

    this.setState({ orderForm: orderFormCopy, formIsValid })
  }

  checkValidity = (value, rules) => {
    // to avoid the gotcha of getting true if only the last
    // check is true, we set isValid to true, then chain the
    // logic with && on each rule. Everything must be true to
    // return true in the end
    let isValid = true

    // if the field is not empty (trim), set valid = true
    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    // if there is a minLength check, validate if >= than it
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    // same for max length
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    return isValid
  }

  render() {
    const { orderForm, formIsValid } = this.state
    const { isLoading } = this.props
    const formElements = []

    for (let key in orderForm) {
      formElements.push({
        id: key,
        config: orderForm[key]
      })
    }

    let form = (
      <form onSubmit={ this.handleSubmitOrder }>
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
              change={ e => this.handleChange(e, formElem.id) } 
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
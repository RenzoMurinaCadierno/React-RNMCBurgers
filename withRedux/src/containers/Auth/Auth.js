import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actionCreators from '../../store/actions/index'

import { updateObject, checkValidity } from '../../utility/utility'
import styles from './Auth.module.css'

class Auth extends Component {

  state = {
    controls: {
      email: {
        elemType: 'input',
        elemConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elemType: 'input',
        elemConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
    },
    isSigningUp: true
  }

  componentDidMount() {
    // are we NOT building a burger and path is not '/'?
    const { 
      isBuilding, authRedirectPath, onSetAuthRedirectPath 
    } = this.props
    
    if (!isBuilding && authRedirectPath !== '/') {
      onSetAuthRedirectPath()
    }
  }

  // checkValidity = (value, rules) => {
  //   let isValid = true

  //   if (!rules) {
  //       return true
  //   }
  //   if (rules.required) {
  //       isValid = value.trim() !== '' && isValid
  //   }
  //   if (rules.minLength) {
  //       isValid = value.length >= rules.minLength && isValid
  //   }
  //   if (rules.maxLength) {
  //       isValid = value.length <= rules.maxLength && isValid
  //   }
  //   if (rules.isEmail) {
  //       const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  //       isValid = pattern.test(value) && isValid
  //   }
  //   if (rules.isNumeric) {
  //       const pattern = /^\d+$/
  //       isValid = pattern.test(value) && isValid
  //   }
  //   return isValid
  // }

  handleChange = ({ target: { value }}, controlName) => {
    const { controls } = this.state

    const updatedControls = updateObject(
      controls, 
      {
        [controlName]: updateObject(
          controls[controlName],
          { 
            value,
            valid: checkValidity(
              value, controls[controlName].validation
            ),
            touched: true
          }
        ) 
      }
    )
    //
    // const updatedControls = {
    //   ...controls,
    //   [controlName]: {
    //     ...controls[controlName],
    //     value,
    //     valid: this.checkValidity(
    //       value, controls[controlName].validation
    //     ),
    //     touched: true
    //   }
    // }

    this.setState({ controls: updatedControls })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { onAuthInit } = this.props
    const { controls, isSigningUp } = this.state

    onAuthInit(
      controls.email.value, controls.password.value, isSigningUp
    )
  }

  handleSwitchAuth = () => {
    this.setState( prevState => {
      return { isSigningUp: !prevState.isSigningUp }
    })
  }

  render() {
    const { controls, isSigningUp } = this.state
    const { 
      isLoading, error, isAuthenticated, authRedirectPath 
    } = this.props

    const formElements = []

    for (let key in controls) {
      formElements.push({
        id: key,
        config: controls[key]
      })
    }

    let form = formElements.map(formElem => (
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

    if (isLoading) form = <Spinner />

    let errorMessage = null

    if (error) errorMessage = (
      <p> { error.message } </p>  // Firebase's error.message prop
    )

    let authRedirect = null

    if (isAuthenticated) {
      authRedirect = <Redirect to={ authRedirectPath } />
    }

    return (
      <div className={ styles.Auth }>
        { authRedirect }
        { errorMessage }
        <form onSubmit={ this.handleSubmit }>
          { form }
          <Button btnType='Success'> Submit </Button>
        </form>
        <Button 
          btnType='Danger' customButtonClick={ this.handleSwitchAuth }
        > 
          { isSigningUp ? 'Signin' : 'Signup' } instead 
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.idToken !== null,
    authRedirectPath: state.auth.authRedirectPath,
    isBuilding: state.burgerBuilder.isBuilding,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthInit: (email, password, isSigningUp) => (
      dispatch(actionCreators.authInit(email, password, isSigningUp))
    ),
    onSetAuthRedirectPath: () => (
      dispatch(actionCreators.setAuthRedirectPath('/'))
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
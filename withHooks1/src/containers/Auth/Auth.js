import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actionCreators from '../../store/actions/index'

import { updateObject, checkValidity } from '../../utility/utility'
import styles from './Auth.module.css'

const Auth = props => {

  const { 
    isBuilding, authRedirectPath, onSetAuthRedirectPath,
    onAuthInit, isLoading, error, isAuthenticated 
  } = props

  const [controls, setControls] = useState({
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
  })
    
  const [isSignup, setIsSignup] = useState(true)

  useEffect(() => {
    if (!isBuilding && authRedirectPath !== '/') {
      onSetAuthRedirectPath()
    }
  }, [isBuilding, authRedirectPath, onSetAuthRedirectPath])

  const handleChange = ({ target: { value }}, controlName) => {

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
    setControls(updatedControls)
  }

  const handleSubmit = e => {
    e.preventDefault()

    onAuthInit(
      controls.email.value, controls.password.value, isSignup
    )
  }

  const handleSwitchAuth = () => {
    setIsSignup(!isSignup)
  }

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
      change={ e => handleChange(e, formElem.id) } 
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
      <form onSubmit={ handleSubmit }>
        { form }
        <Button btnType='Success'> Submit </Button>
      </form>
      <Button 
        btnType='Danger' customButtonClick={ handleSwitchAuth }
      > 
        { isSignup ? 'Signin' : 'Signup' } instead 
      </Button>
    </div>
  )
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
import * as actionTypes from './actionTypes'

export const authStart = () => {
  return { type: actionTypes.AUTH_START }
}

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { idToken, userId }
  }
}

export const authFailed = error => {
  return { 
    type: actionTypes.AUTH_FAILED,
    payload: error
  }
}

export const logout = () => {
  return { type: actionTypes.AUTH_LOGOUT_INIT }
}

export const logoutSuccess = () => {
  return { type: actionTypes.AUTH_LOGOUT }
}

export const checkAuthTimeout = expiresIn => {
  return { 
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    payload: expiresIn
  }
}

export const authInit = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_INIT,
    payload: { email, password, isSignUp }
  }  
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    payload: path
  }
}

export const authCheckState = () => {
  return { type: actionTypes.AUTH_CHECK_STATE }
}

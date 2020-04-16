import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../utility/utility'

const initialState = {
  idToken: null, userId: null, error: null, 
  isLoading: null, authRedirectPath: '/'
}

const authStart = (state, action) => {
  return updateObject(
    state, { error: null, isLoading: true }
  )
}

const authSuccess = (state, action) => {
  return updateObject(
    state, 
    { 
      idToken: action.payload.idToken,
      userId: action.payload.userId,
      error: null,
      isLoading: false
    }
  )
}

const authFailed = (state, action) => {
  return updateObject(
    state, { error: action.payload, isLoading: false }
  )
}

const authLogout = (state, action) => {
  return updateObject(state, { idToken: null, userId: null })
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.payload })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action)
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
    case actionTypes.AUTH_FAILED: return authFailed(state, action)
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
    case actionTypes.SET_AUTH_REDIRECT: return setAuthRedirectPath(state, action)
    default: return state
  }
}

export default reducer
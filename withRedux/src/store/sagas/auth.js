import { put, delay, call } from 'redux-saga/effects'
import * as actionCreators from '../actions/index'
import axios from 'axios'

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'RNMCToken')
  yield call([localStorage, 'removeItem'], 'RNMCExpiration')
  yield call([localStorage, 'removeItem'], 'RNMCUserId')
  yield put(actionCreators.logoutSuccess())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.payload * 1000)
  yield put(actionCreators.logout())
}

export function* authInitSaga(action) {
  yield put(actionCreators.authStart())

  const authData = {
    email: action.payload.email,
    password: action.payload.password,
    returnSecureidToken: true
  }

  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJEG7tMNxiCZTa3illAjaMRKWlVdw77NE`

  if (!action.payload.isSignUp) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJEG7tMNxiCZTa3illAjaMRKWlVdw77NE`
  }

  try {
    const res = yield axios.post(url, authData)
  
    const expirationDate = yield new Date(
      new Date().getTime() + 3600 * 1000
    )
    
    yield localStorage.setItem('RNMCToken', res.data.idToken)
    yield localStorage.setItem('RNMCExpiration', expirationDate)
    yield localStorage.setItem('RNMCUserId', res.data.localId)
  
    yield put(actionCreators.authSuccess(res.data.idToken, res.data.localId))
    yield put(actionCreators.checkAuthTimeout(3600)) // res.data.expiresIn
    
  } catch (err) {

    yield put(actionCreators.authFailed(err.response.data.error))
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('RNMCExpiration')
    
  if (!token) yield put(actionCreators.logout())
  
  else {
    const expirationDate = yield new Date(
      localStorage.getItem('RNMCExpiration')
    )

    if (expirationDate <= new Date()) yield put(actionCreators.logout())

    else {
      const userId = yield localStorage.getItem('RNMCUserId')
      yield put(actionCreators.authSuccess(token, userId))
      yield put(actionCreators.checkAuthTimeout(
        (expirationDate.getTime() - new Date().getTime()) / 1000
      ))
    }
  }
}
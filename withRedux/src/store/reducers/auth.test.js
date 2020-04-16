import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {

  it('should return the initial state', () => {

    expect(reducer(undefined, {} ))  // no state, no action
      .toEqual({
        idToken: null, userId: null, error: null, 
        isLoading: null, authRedirectPath: '/'
      })
  }) 

  it('should store token upon login', () => {

    expect(reducer(  // initalState, action to test w/paylaod
      {
        idToken: null, userId: null, error: null, 
        isLoading: null, authRedirectPath: '/'
      },
      { 
        type: actionTypes.AUTH_SUCCESS,
        payload: { idToken: 'a token', userId: 'a user id' }
      }
    ))
      .toEqual({
        idToken: 'a token', userId: 'a user id', error: null, 
        isLoading: false, authRedirectPath: '/'
      })
  })
})
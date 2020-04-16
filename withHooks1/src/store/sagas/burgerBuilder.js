import { put } from 'redux-saga/effects'
import axios from '../../axios-orders'
import * as actionCreators from '../actions/index'

export function* loadIngredientsSaga(action) {
  try {
    const res = yield axios.get(
      'https://rnmcburgers.firebaseio.com/ingredients.json'
    )
    
    yield put(actionCreators.renderIngredients(res.data))

  } catch (err) {
    yield put(actionCreators.fetchIngredientsFailed())
  }
}

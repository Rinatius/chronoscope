import { combineReducers } from 'redux'
import initDataReducer from '../slices/initData'

export default combineReducers({
  initData: initDataReducer
})
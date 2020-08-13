import { combineReducers } from 'redux'
import initDataReducer from '../slices/initData'
import sliceTagReducer from '../slices/sliceTag'

export default combineReducers({
  initData: initDataReducer,
  sliceTag: sliceTagReducer
})
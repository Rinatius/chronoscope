import { combineReducers } from 'redux'
import initDataReducer from '../slices/initData'
import searchAroundCentroidReducer from '../slices/searchAroundCentroid'

export default combineReducers({
  initData: initDataReducer,
  searchAroundCentroid: searchAroundCentroidReducer
})
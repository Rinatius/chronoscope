import { combineReducers } from 'redux'
import initDataReducer from '../Components/DownloadData/initData'

export default combineReducers({
  initData: initDataReducer
})
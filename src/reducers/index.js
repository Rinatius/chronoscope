import { combineReducers } from 'redux'
import initDataReducer from '../Components/DownloadData/initData'
import mappingsReducer from "../Components/MapData/MappingsSlice";

export default combineReducers({
  data: initDataReducer,
  mappings: mappingsReducer
})
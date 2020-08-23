import { createSlice } from '@reduxjs/toolkit'
import { tsv } from 'd3'

import { mappingAdded } from "../MapData/MappingsSlice"
import { OTHER } from "../MapData/columnTypes"

const initDataSlice = createSlice({
  name: 'data',
  initialState: {},
  reducers: {
    tableStatusChanged(state, action) {
         if (state.hasOwnProperty(action.payload.tableName)) {
         state[action.payload.tableName].status = action.payload.status
         } else {
           return {...state, ...{[action.payload.tableName]: {status: action.payload.status}}}
         }
    },
    tableAdded(state, action) {
      state[action.payload.tableName].data = action.payload.table
      state[action.payload.tableName].status = "added"
    },
    tableCleared(state, action) {
      state[action.payload.tableName].data = []
      state[action.payload.tableName].status = "cleared"
    },
    allCleared(state, action) {
      state.data = {}
    }
  }
})

export const {
  tableStatusChanged,
  tableAdded,
  tableCleared,
  allCleared
} = initDataSlice.actions

//Define a thunk that dispatches those action creators
export const fetchTable = (url) => async dispatch => {
  console.log("Fetch started.")
  dispatch(tableStatusChanged({
    status: "loading",
    tableName: nameFromUrl(url)
  }))
  tsv(url)
    .then(d => {
      console.log("TSV done!")
      dispatch(tableAdded({
        table: d,
        tableName: nameFromUrl(url)
      }))
      console.log("Table added")
      const mapping = {}
      mapping.columns = {}
      Object.keys(d[0]).forEach(colName => {
        mapping.columns[colName] = {type: OTHER}
      })
      console.log(mapping)
      dispatch(mappingAdded({
        mapping: mapping,
        mappingName: nameFromUrl(url)
      }))
      console.log("Mapping Added")
      },
      d => dispatch(tableStatusChanged({
        status: "failed",
        tableName: nameFromUrl(url)
      })))
}

const nameFromUrl = (url) => {
  return "check"
}

export default initDataSlice.reducer
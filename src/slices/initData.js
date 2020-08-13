import { createSlice } from '@reduxjs/toolkit'
import { tsv } from 'd3'

const initDataSlice = createSlice({
  name: 'initData',
  initialState: [],
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

// Define a thunk that dispatches those action creators
export const fetchTable = (url) => async dispatch => {
  console.log("Fetch started.")
  dispatch(tableStatusChanged({
    status: "loading",
    tableName: nameFromUrl(url)
  }))
  tsv(url)
    .then(d => dispatch(tableAdded({
        table: d,
        tableName: nameFromUrl(url)
      })),
      d => dispatch(tableStatusChanged({
        status: "failed",
        tableName: nameFromUrl(url)
      })))
}

const nameFromUrl = (url) => {
  return "check"
}

export default initDataSlice.reducer
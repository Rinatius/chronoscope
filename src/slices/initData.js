import { createSlice } from '@reduxjs/toolkit'
import { tsv } from 'd3'
import Papa from 'papaparse'
import { fromArrayBuffer } from "numpy-parser";

const createKDTree = require('static-kdtree');
const ndarray = require("ndarray")

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
    },
    embedAdded(state, action) {
      state[action.payload.tableName].kdTree = action.payload.kdTree
      state[action.payload.tableName].embeddings = action.payload.embeddings
      state[action.payload.tableName].status = "added"
    }
  }
})

export const {
  tableStatusChanged,
  tableAdded,
  tableCleared,
  allCleared,
  embedAdded
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

export const parseCSV = (file) => async dispatch => {
  console.log("Fetch started.")
  dispatch(tableStatusChanged({
    status: "loading",
    tableName: file.name
  }))
  Papa.parse(file, {
    header: true,
    complete: function(results) {
      console.log(results)
      dispatch(tableAdded({
        table: results.data,
        tableName: file.name
      }))
    },
    error: function(error, file) {
      console.log(error)
      dispatch(tableStatusChanged({
        status: "failed",
        tableName: file.name
      }))
    }
  })
}

export const parseEmbed = (file) => async dispatch => {
  console.log("Parse started.")
  dispatch(tableStatusChanged({
    status: "loading",
    tableName: file.name
  }))
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => {
    const data1D = fromArrayBuffer(reader.result)
    const embeddings = ndarray(data1D.data, data1D.shape);
    const kdTree = createKDTree(embeddings)
    console.log(kdTree.length)
    console.log(kdTree.dimension)
    console.log(typeof kdTree)
    console.log(typeof embeddings)
    // dispatch(embedAdded({
    //   kdTree: kdTree,
    //   embeddings: embeddings,
    //   tableName: file.name
    // }))
  }
  reader.onerror = () => {
    dispatch(tableStatusChanged({
      status: "failed",
      tableName: file.name
    }))
  }
}

const nameFromUrl = (url) => {
  const regex = /[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/
  const match = url.match(regex)[0]
  return match
}

export default initDataSlice.reducer
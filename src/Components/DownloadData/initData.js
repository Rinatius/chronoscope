import { createSlice } from '@reduxjs/toolkit'
import { tsv } from 'd3'

const KEY_COL = "key"
const DATE_COL = "created_at"
const CONTENT_COL = "sentence"
const ACCOUNT_COL = "account"
const USERNAME_COL = "username"
const TAGS_COL = "tags"
const NEGTAGS_COL = "negtags"

const initDataSlice = createSlice({
  name: 'initData',
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

// Define a thunk that dispatches those action creators
// export const fetchTable = (url) => async dispatch => {
//   console.log("Fetch started.")
//   dispatch(tableStatusChanged({
//     status: "loading",
//     tableName: nameFromUrl(url)
//   }))
//   tsv(url)
//     .then(d => dispatch(tableAdded({
//         table: d,
//         tableName: nameFromUrl(url)
//       })),
//       d => dispatch(tableStatusChanged({
//         status: "failed",
//         tableName: nameFromUrl(url)
//       })))
// }

export const fetchTable = (url) => async dispatch => {
  console.log("Fetch started.")
  dispatch(tableStatusChanged({
    status: "loading",
    tableName: nameFromUrl(url)
  }))
  tsv(url, (d, i) => {
      const res = Map({
        key: (KEY_COL in d) ? parseInt(d[KEY_COL]) : i,
        date: new Date(d[DATE_COL]),
        content: d[CONTENT_COL],
        account: d[ACCOUNT_COL],
        username: d[USERNAME_COL],
        tags: (TAGS_COL in d) ? Set(d[TAGS_COL].split(",")) : Set([]),
        negtags: (NEGTAGS_COL in d) ? Set(d[NEGTAGS_COL].split(",")) : Set([])
      });
      return res;
    })
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
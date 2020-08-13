import { createSlice } from '@reduxjs/toolkit'

const sliceTag = createSlice({
  name: 'sliceTag',
  initialState: '',
  reducers: {
    tagOnChange(state, action) {
      if(action.payload !== undefined){
        state = action.payload
      }
       
      return state
    }
  }
})

export const { tagOnChange } = sliceTag.actions

// // Define a thunk that dispatches those action creators
// export const onChange = (tag) => async dispatch => {
//     dispatch(tagOnChange(tag))    
//   }


export default sliceTag.reducer
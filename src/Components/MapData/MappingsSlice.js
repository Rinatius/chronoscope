import { createSlice } from '@reduxjs/toolkit'


const MappingsSlice = createSlice({
  name: 'mappings',
  initialState: {},
  reducers: {
    mappingColumnTypeEdited(state, action) {
      console.log("State: ", state[action.payload.mappingName].columns[action.payload.column])
      state[action.payload.mappingName].columns[action.payload.column].type = action.payload.type
    },
    mappingAdded(state, action) {
     return {
        ...state, ...{[action.payload.mappingName]: action.payload.mapping}
      }
    }
  }
})

export const {
  mappingColumnTypeEdited,
  mappingAdded
} = MappingsSlice.actions

export default MappingsSlice.reducer
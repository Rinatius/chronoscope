import { createSlice } from '@reduxjs/toolkit'

const  searchAroundCentroidSlice = createSlice({
  name: 'centroid',
  initialState: [],
  reducers: {
    kdSearch(state, action) {
        console.log('Action: ', action)
        const { List } = require('immutable');

        const nearestPoints = []

        action.payload.kdTree
        .rnn(action.payload.centroid.data, action.payload.maxKDRadius, point => {
            nearestPoints.push(point)
            return undefined;
      })
        console.log("Nearest Points: ", nearestPoints)
        let nearestRows = List(nearestPoints.map(d => action.payload.data.get(d)));
        if (action.payload.tagModeEnabled) {
            nearestRows = action.payload.excludeTagNegtag(nearestRows)
        }
        state = {filteredData: nearestRows}


    }
  }
})

export const { kdSearch } =  searchAroundCentroidSlice.actions
export default searchAroundCentroidSlice.reducer
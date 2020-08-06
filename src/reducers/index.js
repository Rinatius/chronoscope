const initialState = {
  results: []
}

const reducer = (state = initialState, action) => {
 switch (action.type) {
   case 'UPLOAD':
     return {
       ...state,
       results: []
     }
 }
 return state
}

export default reducer;
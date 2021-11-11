
//GET MASTER OF SUBS
const setSubsListReducer = (state = [], action) => {
  console.log('inside REDUCER, the action.payload is:', action.payload)
  switch (action.type) {
    case "SET_SUBS_LIST":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default setSubsListReducer;


//GET MASTER OF SUBS
const setSubsListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SUBS_LIST":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default setSubsListReducer;


//GET MASTER OF SUBS
const setSubsListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SUBS_LIST":
      return [...state, action.payload];
    case "UNSET_SUBS_LIST":
      return [];
    default:
      return state;
  }
};

export default setSubsListReducer;

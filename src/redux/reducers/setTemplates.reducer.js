
//GET MASTER OF TEMPLATES LIST
const setTemplatesReducer = (state = [], action) => {
    
    switch (action.type) {
      case "SET_TEMPLATES_LIST":
        return [...state, action.payload];
      default:
        return state;
    }
  };
  
  export default setTemplatesReducer;
  
const unsubFeedbackReducer = (state = [], action) => {
    console.log('inside REDUCER, the action.payload is:', action.payload)
    switch (action.type) {
      case "SET_UNSUB_FEEDBACK":
        return [...state, action.payload];
      default:
        return state;
    }
  };
  
  export default unsubFeedbackReducer;
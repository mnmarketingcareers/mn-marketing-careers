const unsubFeedbackReducer = (state = [], action) => {
    // console.log('inside UNSUBFEEDBACK REDUCER, the action.payload is:', action.payload)
    switch (action.type) {
      case "FETCH_UNSUB_FEEDBACK":
        return [...state, action.payload];
      default:
        return state;
    }
  };
  
  export default unsubFeedbackReducer;
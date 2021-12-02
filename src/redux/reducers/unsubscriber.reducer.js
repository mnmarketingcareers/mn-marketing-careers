const unsubscriberReducer = (state = [], action) => {
    // console.log('inside UNSUBFEEDBACK REDUCER, the action.payload is:', action.payload)
    switch (action.type) {
      case "GET_THE_FEEDBACK_FOR_THE_UNSUBSCRIBER_PAGE":
        return [...state, action.payload];
      default:
        return state;
    }
  };
  
  export default unsubscriberReducer;
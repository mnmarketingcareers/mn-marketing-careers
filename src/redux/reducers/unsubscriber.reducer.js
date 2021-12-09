const unsubscriberReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_THE_FEEDBACK_FOR_THE_UNSUBSCRIBER_PAGE":
        return  action.payload;
      default:
        return state;
    }
  };
  
  export default unsubscriberReducer;
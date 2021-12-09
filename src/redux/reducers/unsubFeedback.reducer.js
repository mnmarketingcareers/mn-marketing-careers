const unsubFeedbackReducer = (state = [], action) => {
    switch (action.type) {
      case "FETCH_UNSUB_FEEDBACK":
        return [...state, action.payload];
      case "UNSET_UNSUB_FEEDBACK":
        return [];
      default:
        return state;
    }
  };
  
  export default unsubFeedbackReducer;
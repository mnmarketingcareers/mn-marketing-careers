const setJobsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_FOR_EDIT':
        return action.payload
      case 'UNSET_FOR_EDIT':
        return {};
      default:
        return state;
    }
  };
  
  export default setJobsReducer;
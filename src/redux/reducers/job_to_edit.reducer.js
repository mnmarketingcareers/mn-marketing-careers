const setJobsReducer = (state = {}, action) => {
    // console.log('inside Jobs reducer, Data is:', action.payload)
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
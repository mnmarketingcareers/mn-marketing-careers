const setJobsReducer = (state = [], action) => {
    // console.log('inside Jobs reducer, Data is:', action.payload)
    switch (action.type) {
      case 'SET_JOBS':
        return action.payload
      default:
        return state;
    }
  };
  
  export default setJobsReducer;
const setJobsReducer = (state = [], action) => {
    // console.log('inside Jobs reducer, Data is:', action.payload)
    switch (action.type) {
      case 'SET_JOBS':
        return action.payload
      case 'SET_RECENT_JOBS':
        return action.payload
      case 'UNSET_JOBS':
        return [];
      default:
        return state;
    }
  };
  
  export default setJobsReducer;

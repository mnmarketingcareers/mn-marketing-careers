const setRecentJobs = (state = [], action) => {
    // console.log('inside Jobs reducer, Data is:', action.payload)
    switch (action.type) {
      case 'SET_RECENT_JOBS':
        return action.payload
      default:
        return state;
    }
  };
  
  export default setRecentJobs;
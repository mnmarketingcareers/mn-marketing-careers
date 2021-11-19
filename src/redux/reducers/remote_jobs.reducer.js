const setRemoteJobsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_REMOTE_JOBS':
        return action.payload
      case 'SET_RECENT_REMOTE_JOBS':
        return action.payload
      default:
        return state;
    }
  };
  
  export default setRemoteJobsReducer;
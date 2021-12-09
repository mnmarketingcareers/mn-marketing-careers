const jobTypes = (state = [], action) => {
    switch (action.type) {
      case 'SET_JOBTYPES':
        return action.payload
      case 'UNSET_JOBTYPES':
        return [];
      default:
        return state;
    }
  };
  
  export default jobTypes;
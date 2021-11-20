const jobTypes = (state = [], action) => {
    // console.log('inside Jobs reducer, Data is:', action.payload)
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
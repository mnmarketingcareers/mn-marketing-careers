const setInternshipsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_INTERNSHIPS':
        return action.payload
      case 'SET_RECENT_INTERNSHIPS':
        return action.payload
      default:
        return state;
    }
  };
  
  export default setInternshipsReducer;
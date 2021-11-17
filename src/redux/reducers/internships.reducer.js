const setInternshipsReducer = (state = [], action) => {
    // console.log('inside Internships reducer, Data is:', action.payload)
    switch (action.type) {
      case 'SET_INTERNSHIPS':
        return action.payload
      default:
        return state;
    }
  };
  
  export default setInternshipsReducer;
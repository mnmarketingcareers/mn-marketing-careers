
//GET the CURRENT CAMPAIGN to send
const setActiveCampaignReducer = (state = {}, action) => {
    
    switch (action.type) {
      case "SET_ACTIVE_CAMPAIGN":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default setActiveCampaignReducer;
  
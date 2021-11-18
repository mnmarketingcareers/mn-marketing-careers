
//GET the CURRENT CAMPAIGN to send
const setActiveCampaignReducer = (state = {}, action) => {
    
    switch (action.type) {
      case "SET_ACTIVE_CAMPAIGN":
          console.log('inside setActiveCampaignReducer, the action.payload is:', action.payload)
        return action.payload;
      default:
        return state;
    }
  };
  
  export default setActiveCampaignReducer;
  
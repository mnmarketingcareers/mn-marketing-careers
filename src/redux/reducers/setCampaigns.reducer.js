
//GET LIST OF CAMPAIGNS
const setCampaignsReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_CAMPAIGN_LIST":
        return [...state, action.payload];
      default:
        return state;
    }
  };
  
  export default setCampaignsReducer;
  
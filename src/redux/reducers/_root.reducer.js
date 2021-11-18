import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import setSubsListReducer from './setSubsList.reducer';
import unsubFeedbackReducer from './unsubFeedback.reducer';

// Greg, leaving room for other imports
import pendingPostings from './reviewPending.reducer';
import approvedPostings from './approvedPosts.reducer';
import setJobsReducer from './jobs.reducer';
import setRemoteJobsReducer from './remote_jobs.reducer';
import setInternshipsReducer from './internships.reducer';

// import setRecentJobs from './moreRecentJobs.reducer';

import setTemplatesReducer from './setTemplates.reducer';
import setActiveCampaignReducer from './setActiveCampaign.reducer';
import setCampaignsReducer from './setCampaigns.reducer';
import setRecentJobs from './moreRecentJobs.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  setSubsListReducer,
  unsubFeedbackReducer,
  pendingPostings,
  setJobsReducer,
  setRemoteJobsReducer,
  setInternshipsReducer,
  approvedPostings,

 

  setTemplatesReducer,
  setActiveCampaignReducer,
  setCampaignsReducer,
  setRecentJobs,


});

export default rootReducer;

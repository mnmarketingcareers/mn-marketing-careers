import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import employerSaga from './employer.saga';
import getSubsSaga from './getSubs.saga';
import addSubscriberSaga from './addSubscriber.saga';
import reviewPendingSaga from './reviewPending.saga';
import getFeedbackSaga from './unsubscribe.saga';
import toggleSubscriberStatus from './modifySubStatus.saga';
import fetchJobsSaga from './fetchJobs.saga';
import approvedPostingsSaga from './approvedPostings.saga';
import campaignSaga from './campaign.saga';
import sendEmailNow from './sendEmailNow.saga';
import getCampaignsSaga from './getCampaign.saga';
import patchTemplateSaga from './patchTemplate.saga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    employerSaga(),
    getSubsSaga(), //get from API
    addSubscriberSaga(), //post to API
    reviewPendingSaga(), // Fetches all posts sent from employer saga
    getFeedbackSaga(),
    toggleSubscriberStatus(), //PUT sub status to API
    fetchJobsSaga(),
    approvedPostingsSaga(),
    campaignSaga(), //post create new email campaign
    sendEmailNow(), //post send campaign immediately UNDER CONSTRUCTION
    getCampaignsSaga(), //get campaign info (experimental)
    patchTemplateSaga(), //PUT..er...patch - fix up template for new send

  ]);
}

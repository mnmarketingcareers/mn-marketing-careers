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
import addNewJobIssueSaga from './addJobIssue.saga';
import campaignSaga from './campaign.saga';
import sendEmailNow from './sendEmailNow.saga';
import getCampaignsSaga from './getCampaign.saga';
import patchTemplateSaga from './patchTemplate.saga';
import captchaSaga from './capthca.saga';
import getTemplatesSaga from './getTemplates.saga';
import postNewTemplateSaga from './postTemplate.saga';
import jobIssuesSaga from './jobIssue.saga';
import buildEmailJobListSaga from './builtEmailJobList.saga';
import editSaga from './editPosting.saga';
import getUnsubscriberInfoSaga from './getUnsubscriberFeedback.saga';

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
    addNewJobIssueSaga(), //post to database
    campaignSaga(), //post create new email campaign
    sendEmailNow(), //post send campaign immediately UNDER CONSTRUCTION
    getCampaignsSaga(), //get campaign info (experimental)
    patchTemplateSaga(), //PUT..er...patch - fix up template for new send
    captchaSaga(),
    getTemplatesSaga(), //GET all templates (for dropdown when building email)
    postNewTemplateSaga(), //POST new template from scratch
    jobIssuesSaga(), //GET job issues from database
    buildEmailJobListSaga(), //IMPORTANT
    editSaga(),
    getUnsubscriberInfoSaga()
  ]);
}

import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* addNewJobIssue(action) {
    try {
        console.log('action.payload in addNewJobIssue is:', action.payload);
        yield axios({
            method: 'POST',
            url: '/api/jobissues',
            data: action.payload
        })
        yield put({type: 'FETCH_MAIN_JOBS'})
    } catch (error) {
        console.log('error in sending new job issue to database', error);
    };
};

function* fetchJobId(action) {
    try{
        const jobIssueId = action.payload.job_posting_id;
        const jobIssue = yield axios.get(`/api/job/${jobIssueId}`);
        console.log('In fetch job by ID, response from server: ', jobIssue.data);
        yield put({ type: "SET_JOBS", payload: jobIssue.data});
    } catch (error) {
        console.log("Failure to GET all job issues", error);
    }
};

//listener - add an issue
function* addNewJobIssueSaga() {
    yield takeEvery('ADD_JOB_ISSUE', addNewJobIssue);
    yield takeEvery('FETCH_JOB_ID', fetchJobId);
};

export default addNewJobIssueSaga;
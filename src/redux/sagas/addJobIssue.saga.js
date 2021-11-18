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

//listener - add an issue
function* addNewJobIssueSaga() {
    yield takeEvery('ADD_JOB_ISSUE', addNewJobIssue);
};

export default addNewJobIssueSaga;
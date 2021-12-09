import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// this function grabs all needed job issue feedback data from the database
function* fetchJobIssues(action) {
    try{
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        const response = yield axios.get('/api/jobissues', config);
        // this database information is then added to the reducer
        yield put({ type: 'SET_JOB_ISSUE_LIST', payload: response.data});
    } catch (error) {
        console.log('Job Issues GET Request Failed', error);
    }
}

function* deleteJobIssue(action) {
    try{
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        const issueId = action.payload.id;
        const response = yield axios.delete(`/api/jobissues/${issueId}`, config);
        // this database information is then added to the reducer
        yield put({ type: 'FETCH_JOB_ISSUES', payload: response.data});
    } catch (error) {
        console.log('Job Issues GET Request Failed', error);
    }
}

function* jobIssuesSaga() {
    yield takeEvery('FETCH_JOB_ISSUES', fetchJobIssues);
    yield takeEvery('DELETE_ISSUE', deleteJobIssue);
}

export default jobIssuesSaga;
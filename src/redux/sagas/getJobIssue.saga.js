import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// this function grabs all needed job issue feedback data from the database
function* fetchJobIssues(action) {
    try{
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        console.log('action.payload is:', action.payload);
        const response = yield axios.get('/api/jobissues', config);
        console.log('response.data is:', response.data);
        // this database information is then added to the reducer
        yield put({ type: 'SET_JOB_ISSUE_LIST', payload: response.data});
    } catch (error) {
        console.log('Job Issues GET Request Failed', error);
    }
}

function* getJobIssuesSaga() {
    yield takeEvery('FETCH_JOB_ISSUES', fetchJobIssues);
}

export default getJobIssuesSaga;
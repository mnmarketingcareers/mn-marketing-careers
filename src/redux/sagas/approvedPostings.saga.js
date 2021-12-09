import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchApprovedPostings () {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };
          // make axios call, set response to a variable
          const response = yield axios.get('/api/job/approved', config);

          if(response.data.length > 0) {
                // send dispatch and payload to reducer
            yield put({ type: 'SET_APPROVED_POSTINGS', payload: response.data})
            } else {
                // if no job postings match the request, don't show anything already in reducer
                yield put({ type: 'RESET_APPROVED_POSTINGS' });
            }
    } catch (error) {
        console.log("ERROR in get approved postings", error);
    }
}

function* addApprovedPosting (action) {
    try {
          const newJob = action.payload;
          yield axios.post('/api/job', newJob);
          
        } catch(err) {
          console.log('Error adding job posting', err)
        }
}

function* approvedPostingsSaga () {
    yield takeLatest('FETCH_APPROVED_POSTINGS', fetchApprovedPostings);
    yield takeLatest('ADD_APPROVED_JOB_POST', addApprovedPosting);
}

export default approvedPostingsSaga;
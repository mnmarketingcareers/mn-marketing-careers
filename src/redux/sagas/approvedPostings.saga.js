import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchApprovedPostings () {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };
          console.log('fetching approved job postings');
          // make axios call, set response to a variable
          const response = yield axios.get('/api/job/approved', config);
          console.log('Response to call for approved job postings ', response.data);

          if(response.data.length > 0) {
                // send dispatch and payload to reducer
            yield put({ type: 'SET_APPROVED_POSTINGS', payload: response.data})
            } else {
                // if no climbs match the request, don't show anything already in reducer
                yield put({ type: 'RESET_APPROVED_POSTINGS' });
            }
    } catch (error) {
        console.log("ERROR in get approved postings", error);
    }
}

function* approvedPostingsSaga () {
    yield takeLatest('FETCH_APPROVED_POSTINGS', fetchApprovedPostings);
}

export default approvedPostingsSaga;
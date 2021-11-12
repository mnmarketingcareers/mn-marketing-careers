import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPendingPostings () {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };
          // make axios call, set response to a variable
          const response = yield axios.get('/api/job/pending', config);

          if(response.data.length > 0) {
                // send dispatch and payload to reducer
            yield put({ type: 'SET_PENDING_POSTINGS', payload: response.data})
            } else {
                // if no climbs match the request, don't show anything already in reducer
                yield put({ type: 'RESET_PENDING_POSTINGS' });
            }
    } catch (error) {
        
    }
}

function* reviewPendingSaga () {
    yield takeLatest('FETCH_PENDING_POSTINGS', fetchPendingPostings)
}

export default reviewPendingSaga;
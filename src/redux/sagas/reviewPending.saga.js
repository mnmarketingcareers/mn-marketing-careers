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
        console.log("ERROR in get pending postings", error);
    }
}

function* approvePosting (action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };
        const id = action.payload.id;
        const response = yield axios.put(`/api/job/${id}`, action.payload, config);
        // verify success with a console log
        yield put({ type: 'FETCH_PENDING_POSTINGS' });
    } catch (error) {
        console.log("ERROR in approving pending postings", error);
    }
}

function* deletePosting (action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };
        const id = action.payload.id;
        const response = yield axios.delete(`/api/job/${id}`, config);
        // verify success with a console log
        yield put({ type: 'FETCH_PENDING_POSTINGS' });
    } catch (error) {
        console.log("ERROR in deny pending postings", error);
    }
}

function* postApprovedJobs() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };
        const response = yield axios.put(`/api/job/tolist`,config);
        // verify success with a console log
        yield put({ type: 'FETCH_PENDING_POSTINGS' });
    } catch (error) {
        console.log("ERROR in posting approved postings", error);
    }
}

function* reviewPendingSaga () {
    yield takeLatest('FETCH_PENDING_POSTINGS', fetchPendingPostings);
    yield takeLatest('APPROVE_POSTING', approvePosting);
    yield takeLatest('DELETE_POSTING', deletePosting);
    yield takeLatest('POST_APPROVED_JOBS', postApprovedJobs)
}

export default reviewPendingSaga;
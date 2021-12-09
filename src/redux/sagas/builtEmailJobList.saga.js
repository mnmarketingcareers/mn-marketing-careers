import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* buildJobList () {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };
          // make axios call, set response to a variable //fix
          const response = yield axios.get('/template/joblist', config);

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

function* buildEmailJobListSaga () {
    yield takeLatest('BUILD_EMAIL_JOB_LIST', buildJobList);
}

export default buildEmailJobListSaga;
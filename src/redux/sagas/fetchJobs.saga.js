import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchJobs()  {
    // console.log('in fetchJobs')
  try {
    // console.log('in fetchJobs')
    const approvedJobs = yield axios.get("/api/job");
    yield put({ type: "SET_JOBS", payload: approvedJobs.data });
    console.log('approvedJobs.data is:', approvedJobs.data)
  } catch (error) {
    console.log("Failure to GET all approved jobs", error);
  }
}

function* fetchJobsSaga() {
  yield takeEvery("FETCH_MAIN_JOBS", fetchJobs);
}

export default fetchJobsSaga;
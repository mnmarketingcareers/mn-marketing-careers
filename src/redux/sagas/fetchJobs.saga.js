import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchJobs()  {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const approvedJobs = yield axios.get("/api/job");
    yield put({ type: "SET_JOBS", payload: approvedJobs.data}, config);
  } catch (error) {
    console.log("Failure to GET all approved jobs", error);
  }
};

function* fetchRemoteJobs(){
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const approvedRemoteJobs = yield axios.get("/api/search/", config);
    yield put({ type: "SET_REMOTE_JOBS", payload: approvedRemoteJobs.data})
  } catch (error){
    console.log("Error in GET Remote Jobs", error);
  }
};

function* fetchInternships(){
  try{
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const approvedInternships = yield axios.get("/api/search/internships", config);
    console.log('approvedInternships is', approvedInternships);
    yield put({ type: "SET_INTERNSHIPS", payload: approvedInternships.data})
  } catch (error){
    console.log("Error in GET Internships ");
  }
}

function* fetchJobsByAge(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const age = action.payload.age;
    const jobsByAgeResponse = yield axios.get(`/api/recentjob/${age}`, config);
    console.log("jobs by age", age, "response", jobsByAgeResponse.data);
    yield put({ type: 'SET_RECENT_JOBS', payload: jobsByAgeResponse.data})
  } catch (error) {
    console.log('ERROR in GET jobs by age', error);
  }
}

function* fetchJobsSaga() {
  yield takeEvery("FETCH_MAIN_JOBS", fetchJobs);
  yield takeEvery("FETCH_REMOTE_JOBS", fetchRemoteJobs);
  yield takeEvery("FETCH_INTERNSHIPS", fetchInternships);
  yield takeEvery("FETCH_RECENT_JOBS", fetchJobsByAge);
}

export default fetchJobsSaga;
import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchJobs()  {
  try {
    const approvedJobs = yield axios.get("/api/job");
    yield put({ type: "SET_JOBS", payload: approvedJobs.data});
  } catch (error) {
    console.log("Failure to GET all approved jobs", error);
  }
};

function* fetchRemoteJobs(){
  try {
    const approvedRemoteJobs = yield axios.get("/api/search/");
    yield put({ type: "SET_REMOTE_JOBS", payload: approvedRemoteJobs.data})
  } catch (error){
    console.log("Error in GET Remote Jobs", error);
  }
};

function* fetchInternships(){
  try{
    const approvedInternships = yield axios.get("/api/search/internships");
    console.log('approvedInternships is', approvedInternships);
    yield put({ type: "SET_INTERNSHIPS", payload: approvedInternships.data})
  } catch (error){
    console.log("Error in GET Internships ");
  }
}

function* fetchJobsSaga() {
  yield takeEvery("FETCH_MAIN_JOBS", fetchJobs);
  yield takeEvery("FETCH_REMOTE_JOBS", fetchRemoteJobs);
  yield takeEvery("FETCH_INTERNSHIPS", fetchInternships)
}

export default fetchJobsSaga;
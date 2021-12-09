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
    yield put({ type: "SET_INTERNSHIPS", payload: approvedInternships.data})
  } catch (error){
    console.log("Error in GET Internships ");
  }
}

function* fetchJobsByAge(action) {
  try {
    const age = action.payload.age;
    const jobsByAgeResponse = yield axios.get(`/api/recentjob/${age}`);
    yield put({ type: 'SET_RECENT_JOBS', payload: jobsByAgeResponse.data})
  } catch (error) {
    console.log('ERROR in GET jobs by age', error);
  }
}

function* fetchRemoteJobsByAge(action) {
  try {
    const age = action.payload.age;
    const remoteJobsByAgeResponse = yield axios.get(`/api/recentjob/remote/${age}`);
    yield put({ type: 'SET_RECENT_REMOTE_JOBS', payload: remoteJobsByAgeResponse.data})
  } catch (error) {
    console.log('ERROR in GET remote jobs by age', error);
  }
}

function* fetchInternshipsByAge(action) {
  try {
    const age = action.payload.age;
    const remoteInternshipsByAgeResponse = yield axios.get(`/api/recentjob/internships/${age}`);
    yield put({ type: 'SET_RECENT_INTERNSHIPS', payload: remoteInternshipsByAgeResponse.data})
  } catch (error) {
    console.log('ERROR in GET remote jobs by age', error);
  }
}

function* fetchJobsSaga() {
  yield takeEvery("FETCH_MAIN_JOBS", fetchJobs);
  yield takeEvery("FETCH_REMOTE_JOBS", fetchRemoteJobs);
  yield takeEvery("FETCH_INTERNSHIPS", fetchInternships);
  yield takeEvery("FETCH_RECENT_JOBS", fetchJobsByAge);
  yield takeEvery("FETCH_RECENT_REMOTE_JOBS", fetchRemoteJobsByAge);
  yield takeEvery("FETCH_RECENT_INTERNSHIPS", fetchInternshipsByAge);
}

export default fetchJobsSaga;
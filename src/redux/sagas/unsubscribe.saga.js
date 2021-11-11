import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchAllFeedback() {
  try {
      console.log('Get all subs saga')
    const response = yield axios.get("/api/feedback");
    yield put({ type: "SUBMIT_FEEDBACK", payload: response.data });
    console.log('response is:', response.data)
  } catch (error) {
    console.log("Failure to GET ALL SUBS AND ALL INFO", error);
  }
}

function* getFeedbackSaga() {
  yield takeEvery("GET_FEEDBACK", fetchAllFeedback);

}
export default getFeedbackSaga;
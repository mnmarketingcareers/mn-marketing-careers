import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* addUnsubFeedback(action) {
  try {
    // we are sending form data to the database
    const response = yield axios.post("/api/feedback", action.payload);
    alert("Successfully unsuscribed, you can close this tab");
    // yield put({ type: "SET_UNSUB_FEEDBACK", payload: response.data });
  } catch (error) {
    alert('Not unsubscribed. Did you type your email address correctly?')
    console.log("Failure to GET ALL SUBS AND ALL INFO", error);
  }
}

function* getFeedbackSaga() {
  yield takeEvery("SUBMIT_UNSUB_FEEDBACK", addUnsubFeedback);
}
export default getFeedbackSaga;
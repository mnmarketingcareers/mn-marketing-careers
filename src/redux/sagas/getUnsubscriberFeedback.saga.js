import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* getUnsubFeedback(){
    try {
      const theFeedback = yield axios.get("/api/feedback/feedbacklist");
      yield put({type: 'GET_THE_FEEDBACK_FOR_THE_UNSUBSCRIBER_PAGE', payload: theFeedback.data})
    } catch (error){
      console.log("Failure in GET UNSUBSCRIBER'S FEEDBACK ")
    }
  }

  function* getUnsubscriberInfoSaga() {
    yield takeEvery("GET_UNSUBSCRIBER_FEEDBACK", getUnsubFeedback)  
  }
  export default getUnsubscriberInfoSaga;

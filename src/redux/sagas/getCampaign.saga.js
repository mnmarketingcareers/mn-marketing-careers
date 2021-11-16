import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchCampaignInfo()  {
  try {
      console.log('Get campaign info! Weee!')
    const response = yield axios.get("/api/campaign/getinfo");
    yield put({ type: "SET_CAMPAIGN_INFO", payload: response}); //important //fix make reducer!!
    console.log('response is:', response) //important parse this out
  } catch (error) {
    console.log("Failure to GET campaign info", error);
  }
}

function* getCampaignsSaga() {
  yield takeEvery("GET_CAMPAIGN", fetchCampaignInfo);
}

export default getCampaignsSaga;

import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchCampaignInfo()  {
  try {
    const response = yield axios.get("/api/campaign/getinfo");
    yield put({ type: "SET_CAMPAIGN_LIST", payload: response.data.campaigns}); //important //fix make reducer!!
    // console.log('response in fetch campaign info:', response.data.campaigns) //important parse this out
  } catch (error) {
    console.log("Failure to GET campaign info", error);
  }
}

function* getCampaignsSaga() {
  yield takeEvery("GET_CAMPAIGNS", fetchCampaignInfo);
}

export default getCampaignsSaga;

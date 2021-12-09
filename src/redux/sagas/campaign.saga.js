import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* createCampaign(action) {
    try {
        const response = yield axios({
            method: "POST", 
            url: "/api/campaign", 
            data: action.payload
        });
        yield put({ type: "SET_ACTIVE_CAMPAIGN", payload: response.data });  //updated hope this works?
    } catch (error) {
        console.log("error in create campaign saga", error)
    };
};

//listener - create campaign
function* campaignSaga() { 
    yield takeEvery("CREATE_CAMPAIGN", createCampaign);
}

export default campaignSaga;
import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* createCampaign(action) {
    try {
        console.log("action.payload in CREATE CAMPAIGN SAGA is:", action.payload)
        yield axios({
            method: "POST", 
            url: "/api/campaign", 
            data: action.payload
        });
        // yield put({ type: "GET_SUBS" }); //FIX //IMPORTANT
    } catch (error) {
        console.log("error in create campaign saga", error)
    };
};

//listener - create campaign
function* campaignSaga() { 
    yield takeEvery("CREATE_CAMPAIGN", createCampaign);
}

export default campaignSaga;
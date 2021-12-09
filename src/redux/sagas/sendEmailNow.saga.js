import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* pushEmail(action) {
    try {
        yield axios({
            method: "POST", 
            url: "/api/campaign/send", 
            data: action.payload
        });
        // yield put({ type: "GET_SUBS" }); //FIX //IMPORTANT???????????????????
    } catch (error) {
        console.log("error in create campaign saga", error)
    };
};

//listener - create campaign
function* sendEmailNow() { 
    yield takeEvery("SEND_EMAIL_NOW", pushEmail);
}

export default sendEmailNow;
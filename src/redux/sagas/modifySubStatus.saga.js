import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* modifySubStatus(action) {
    try {
        yield axios({
            method: "put", 
            url: "/api/subs", 
            data: action.payload
        });
        yield put({ type: "GET_SUBS" });
    } catch (error) {
        console.log("error in sending new subscriber to mailchimp!", error)
    };
};

//listener - add a sub
function* toggleSubscriberStatus() { 
    yield takeEvery("TOGGLE_SUB_STATUS", modifySubStatus);
}

export default toggleSubscriberStatus;
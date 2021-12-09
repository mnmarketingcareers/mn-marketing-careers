import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* addNewSubscriber(action) {
    try {
        yield axios({
            method: "POST", 
            url: "/api/subs", 
            data: action.payload
        });
        yield put({ type: "GET_SUBS" });
    } catch (error) {
        console.log("error in sending new subscriber to mailchimp!", error)
    };
};

//listener - add a sub
function* addSubscriberSaga() { 
    yield takeEvery("ADD_SUBSCRIBER", addNewSubscriber);
}

export default addSubscriberSaga;
import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* patchTemplate(action) {
    try {
        console.log("action.payload in PATCH TEMPLATE saga is:", action.payload)
        yield axios({
            method: "post",  //updated from patch
            url: "/api/template", 
            data: action.payload
        });
        // yield put({ type: "GET_SUBS" });
    } catch (error) {
        console.log("error in sending new subscriber to mailchimp!", error)
    };
};

//listener - add a sub
function* patchTemplateSaga() { 
    yield takeEvery("SEND_PATCH_TEMPLATE", patchTemplate);
}

export default patchTemplateSaga;
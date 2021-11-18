import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* patchTemplate(action) {
    try {
        console.log("action.payload in PATCH TEMPLATE saga is:", action.payload)
        yield axios({
            method: "patch",  
            url: "/api/template/", 
            data: action.payload
        });
        yield put({ type: "GET_TEMPLATES" }); 
    } catch (error) {
        console.log("error PATCHING old template in MailChimp", error)
    };
};

//listener - add a sub
function* patchTemplateSaga() { 
    yield takeEvery("SEND_PATCH_TEMPLATE", patchTemplate);
}

export default patchTemplateSaga;
import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* postNewTemplate(action) {
    try {
        yield axios({
            method: "post",  
            url: "/api/template/", 
            data: action.payload
        });
        yield put({ type: "GET_TEMPLATES" });
    } catch (error) {
        console.log("error in posting new template to Mailchimp", error)
    };
};

//listener - add a sub
function* postNewTemplateSaga() { 
    yield takeEvery("SEND_POST_TEMPLATE", postNewTemplate);
}

export default postNewTemplateSaga;


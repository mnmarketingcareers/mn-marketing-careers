import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchAllTemplates()  {
  try {
      console.log('inside getTemplatesSaga! Woot!')
    const response = yield axios.get("/api/template/");
    yield put({ type: "SET_TEMPLATES_LIST", payload: response.data.templates });
    console.log('"response.data.templates" to set templates list (from router) is:', response.data.templates)
  } catch (error) {
    console.log("Failure to fetchAllTemplates", error);
  }
}

function* getTemplatesSaga() {
  yield takeEvery("GET_TEMPLATES", fetchAllTemplates);
}

export default getTemplatesSaga;

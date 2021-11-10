import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchAllSubs() {
  try {
      console.log('Get all subs saga')
    const response = yield axios.get("/api/subs/");
    yield put({ type: "SET_SUBS_LIST", payload: response });
    console.log('response is:', response.data)
  } catch (error) {
    console.log("Failure to GET ALL SUBS AND ALL INFO", error);
  }
}

function* getSubsSaga() {
  yield takeEvery("GET_SUBS", fetchAllSubs);
}

export default getSubsSaga;

import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchAllSubs()  {
  try {
    const response = yield axios.get("/api/subs/");
    yield put({ type: "SET_SUBS_LIST", payload: response.data.members });
  } catch (error) {
    console.log("Failure to GET ALL SUBS AND ALL INFO", error);
  }
}

function* getSubsSaga() {
  yield takeEvery("GET_SUBS", fetchAllSubs);
}

export default getSubsSaga;

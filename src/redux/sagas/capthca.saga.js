import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

function* lasagna(action){
    try {
        const token = action.payload;
        const response = yield axios.post('/api/verify', {token: token});
        yield put({ type: 'SET_LASAGNA', payload: response.data });
      } catch(err) {
        console.log("Error verifying", err)
      }
};

function* captchaSaga(){
    yield takeLatest('LASAGNA', lasagna);

}

export default captchaSaga;
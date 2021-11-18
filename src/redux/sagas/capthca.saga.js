import {takeLatest } from 'redux-saga/effects'
import axios from 'axios';

function* lasagna(action){
    try {
      console.log('verifying token', action.payload)
        const token = action.payload;
        const response = yield axios.post('/api/verify', token);
        console.log('Did it verify?', response.data);
        yield put({ type: 'SET_LASAGNA', payload: response.data });
      } catch(err) {
        console.log(err)
      }
};

function* captchaSaga(){
    yield takeLatest('LASAGNA', lasagna)

}

export default captchaSaga;
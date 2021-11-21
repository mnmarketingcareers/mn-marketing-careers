import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* editJobPosting (action) {
    try 
    {
        const config = {
        headers: { 'Content-type': 'application/json' },
        withCredentials: true,
        };
        
        // make axios call, sending id and job posting item with changes from action payload;
        const id = action.payload.id;
        const response = axios.put(`/api/search/${id}`, action.payload, config);
        console.log('Rows Edited: ', response.rowCount);
    } catch (err) {
        console.log('ERROR making edit', err);
    }
}

function* editSaga() {
    yield takeLatest('EDIT_JOB_POSTING', editJobPosting);
}

export default editSaga;
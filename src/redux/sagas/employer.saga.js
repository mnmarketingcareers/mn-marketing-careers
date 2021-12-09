import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

function* addEmployerForm(action){
    try {
        const newEmployerForm = action.payload;
        yield axios.post('/api/employer', newEmployerForm);
        
      } catch(err) {
        console.log(err)
      }
};

function* getJobTypes(action) {
  const jobTypes = yield axios.get('/api/jobtypes')
  yield put({ type: 'SET_JOBTYPES', payload: jobTypes.data});
}

function* employerSaga(){
    yield takeLatest('NEW_EMPLOYER_JOB_POST', addEmployerForm)
    yield takeLatest('GET_JOB_TYPES', getJobTypes)
}

export default employerSaga;
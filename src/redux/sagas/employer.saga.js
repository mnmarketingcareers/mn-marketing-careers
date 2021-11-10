import {takeLatest } from 'redux-saga/effects'
import axios from 'axios';

function* addEmployerForm(action){
    try {
      console.log('First saga wired up', action.payload)
        const newEmployerForm = action.payload;
        yield axios.post('/api/jobs', newEmployerForm);
        
      } catch(err) {
        console.log(err)
      }
};

function* employerSaga(){
    yield takeLatest('NEW_EMPLOYER_JOB_POST', addEmployerForm)

}

export default employerSaga;
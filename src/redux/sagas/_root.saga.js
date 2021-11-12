import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import employerSaga from './employer.saga';
import getSubsSaga from './getSubs.saga';
import addSubscriberSaga from './addSubscriber.saga';
import getFeedbackSaga from './unsubscribe.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    employerSaga(),
    getSubsSaga(), //get from API
    addSubscriberSaga(), //post to API
    getFeedbackSaga()
  ]);
}

import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* fetchUserList() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/user/list', config);
    // send response to reducer
    yield put({ type: 'SET_USER_LIST', payload: response.data});
  } catch (error) {
    console.log('UserList get request failed', error);
  }
}

function* grantAdminAccess (action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const idToUpdate = action.payload;

    const response = yield axios.put(`/api/user/grant/${idToUpdate}`, config);
    // on success fetch all users
    yield put({ type: 'FETCH_USER_LIST' });
  } catch (error) {
    console.log('Request to grant access failed', error);
  }
}

function* removeAdminAccess (action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const idToUpdate = action.payload;

    const response = yield axios.put(`/api/user/remove/${idToUpdate}`, config);
    // on success fetch all users
    yield put({ type: 'FETCH_USER_LIST' });
  } catch (error) {
    console.log('Request to remove access failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_USER_LIST', fetchUserList);
  yield takeLatest('GRANT_ADMIN_ACCESS', grantAdminAccess);
  yield takeLatest('REMOVE_ADMIN_ACCESS', removeAdminAccess);
}

export default userSaga;

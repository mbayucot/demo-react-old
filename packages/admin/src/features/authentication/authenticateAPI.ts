import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  login,
  logout,
  register,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
} from './authenticationSlice';
import { postRequest, deleteRequest } from '../../app/axiosClient';

function* loginAPI(action: { payload: any }) {
  try {
    // @ts-ignore
    const response = yield call(() => postRequest('login', action.payload));
    yield put(loginSuccess(response));
  } catch (e) {
    yield put(loginFailure());
  }
}

function* logoutAPI(action: { payload: any }) {
  try {
    // @ts-ignore
    yield call(() => deleteRequest('logout'));
    yield put(logoutSuccess());
  } catch (e) {
    yield put(logoutFailure());
  }
}

function* registerAPI(action: { payload: any }) {
  try {
    // @ts-ignore
    const response = yield call(() => postRequest('signup', action.payload));
    yield put(loginSuccess(response.headers.authorization));
  } catch (e) {
    yield put(loginFailure());
  }
}

export default function* rootSaga() {
  yield takeLatest(login, loginAPI);
  yield takeLatest(logout, logoutAPI);
  yield takeLatest(register, registerAPI);
}

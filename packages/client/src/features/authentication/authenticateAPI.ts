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

export function* loginSaga(action: { payload: any }) {
  try {
    // @ts-ignore
    const response = yield call(postRequest, 'login', action.payload);
    yield put(loginSuccess(response.headers.authorization));
  } catch (e) {
    yield put(loginFailure());
  }
}

export function* logoutSaga() {
  try {
    // @ts-ignore
    yield call(deleteRequest, 'logout');
    yield put(logoutSuccess());
  } catch (e) {
    yield put(logoutFailure());
  }
}

export function* registerSaga(action: { payload: any }) {
  try {
    // @ts-ignore
    const response = yield call(postRequest, 'signup', action.payload);
    yield put(loginSuccess(response.headers.authorization));
  } catch (e) {
    yield put(loginFailure());
  }
}

export default function* rootSaga() {
  yield takeLatest(login, loginSaga);
  yield takeLatest(logout, logoutSaga);
  yield takeLatest(register, registerSaga);
}

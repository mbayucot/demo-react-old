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
    if (typeof e === 'string') {
      yield put(loginFailure(e.toString()));
    } else if (e instanceof Error) {
      yield put(loginFailure(e.message));
    }
  }
}

export function* logoutSaga() {
  try {
    yield call(deleteRequest, 'logout');
    yield put(logoutSuccess());
  } catch (e) {
    if (typeof e === 'string') {
      yield put(logoutFailure(e.toString()));
    } else if (e instanceof Error) {
      yield put(logoutFailure(e.message));
    }
  }
}

export function* registerSaga(action: { payload: any }) {
  try {
    // @ts-ignore
    const response = yield call(postRequest, 'signup', action.payload);
    yield put(loginSuccess(response.headers.authorization));
  } catch (e) {
    if (typeof e === 'string') {
      yield put(loginFailure(e.toString()));
    } else if (e instanceof Error) {
      yield put(loginFailure(e.message));
    }
  }
}

export default function* rootSaga() {
  yield takeLatest(login, loginSaga);
  yield takeLatest(logout, logoutSaga);
  yield takeLatest(register, registerSaga);
}

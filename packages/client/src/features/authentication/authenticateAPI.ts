import { all, call, put, takeLatest } from 'redux-saga/effects';
import { login, loginSuccess, loginFailure } from './authenticationSlice';
import { postRequest } from '../../app/axiosClient';

function* loginAPI(action: { payload: any }) {
  try {
    // @ts-ignore
    const response = yield call(() => postRequest('login', action.payload));
    yield put(loginSuccess(response.headers.authorization));
  } catch (e) {
    yield put(loginFailure());
  }
}

export default function* rootSaga() {
  yield all([takeLatest(login, loginAPI)]);
}

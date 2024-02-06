import { all, call, fork, put, takeEvery } from "@redux-saga/core/effects";
import actions from "./action";
import { _login } from "./slice";
import { LoginApi } from "@/api/AuthApi";
import { PayloadAction } from "@reduxjs/toolkit"; // Import PayloadAction từ Redux Toolkit

// Import các thư viện cần thiết

interface LoginAction {
  type: string;
  payload: {
    data: {
      username: string;
      password: string;
    }
    onSuccess: () => void;
    onError: () => void;
  };
}

function* watchLogin() {
  yield takeEvery(actions.LOGIN, function* (action: PayloadAction<LoginAction>): Generator<any, void, any> {
    console.log(action.payload);
    const onSuccess = action.payload.onSuccess;
    const onError = action.payload.onError;
    const username = action.payload.data.username;
    const password = action.payload.data.password;
    try {
      const res = yield call(LoginApi, { username, password }); // Gửi dữ liệu email và password
      yield put(
        _login({
          payload: res.Data,
        })
      );
      onSuccess && onSuccess();
    } catch (error) {
      console.log(error)
      onError && onError();
    } finally {
    }
  });
}


export default function* AuthSaga() {
  yield all([
    fork(watchLogin),
  ]);
}

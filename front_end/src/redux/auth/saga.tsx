import { all, call, fork, put, takeEvery } from "@redux-saga/core/effects";
// import actions from "./action";
import { _login } from "./slice";
import { LoginApi, GetProfileApi } from "@/api/AuthApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "@/types/LoginPayload";
import { GetProfilePayload } from "@/types/GetProfilePayload";

function* watchLogin() {
  // yield takeEvery(actions.LOGIN, function* (action: PayloadAction<LoginPayload>): Generator<any, void, any> {
  //   const { onSuccess, onError, data } = action.payload;
  //   try {
  //     const res = yield call(LoginApi, data);
  //     yield put(
  //       _login({
  //         payload: res.Data,
  //       })
  //     );
  //     onSuccess && onSuccess();
  //   } catch (error) {
  //     onError && onError();
  //   } finally {
  //   }
  // });
}

function* watchGetProfile() {
  // yield takeEvery(actions.GET_PROFILE, function* (action: PayloadAction<GetProfilePayload>): Generator<any, void, any> {
  //   const { onSuccess, onError } = action.payload;
  //   try {
  //     const res = yield call(GetProfileApi);
  //     onSuccess && onSuccess(res.Data);
  //   } catch (error) {
  //     onError && onError("");
  //   } finally {
  //   }
  // });
}

export default function* AuthSaga() {
  yield all([
    fork(watchLogin),
    fork(watchGetProfile),
  ]);
}

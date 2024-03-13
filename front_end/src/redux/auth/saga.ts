import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
// import actions from "./action";
import ApiCode from "@/enums/ApiCode";
import { HttpCode } from "@/enums/HttpCode";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "@/types/LoginPayload";
import { GetProfilePayload } from "@/types/GetProfilePayload";
import {
  LoginApi,
  GetProfileApi,
  GetNewAccessTokenApi
} from "@/api/AuthApi";
import {
  loginAction,
  loginActionSuccess,
  getProfileAction,
  getProfileActionSuccess,
  getAccessTokenByRefreshTokenAction,
  getAccessTokenByRefreshTokenActionSuccess,
} from "./slice";

function* watchLogin() {
  yield takeEvery(loginAction.type, function* ({ payload }: PayloadAction<LoginPayload>): Generator<any, void, any> {
    const { onSuccess, onError, data } = payload;
    console.log("login saga payload: ", payload)
    try {
      const res = yield call(LoginApi, data);
      if (res.status === HttpCode.OK) {
        if (res?.data?.statusCode == ApiCode.SUCCESS) {
          yield put(
            loginActionSuccess({
              data: res?.data?.data,
            })
          );
          onSuccess && onSuccess();
        }
      }
      if (res.status === HttpCode.BAD_REQUEST) {
        onError && onError();
      }
    } catch (error) {
      onError && onError();
    } finally {
    }
  });
}

function* watchGetProfile() {
  yield takeEvery(getProfileAction.type, function* ({ payload }: PayloadAction<GetProfilePayload>): Generator<any, void, any> {
    const { onSuccess, onError, data } = payload;
    console.log("get profile saga payload: ", payload);
    try {
      const res = yield call(GetProfileApi);
      if (res.status === HttpCode.OK) {
        if (res?.data?.statusCode == ApiCode.SUCCESS) {
          yield put(
            getProfileActionSuccess({
              data: res?.data?.data,
            })
          );
          onSuccess && onSuccess(res?.data?.data);
        }
        else {
          onError && onError("not success");
        }
      }
      if (res.status === HttpCode.BAD_REQUEST || res.status === HttpCode.UNAUTHORIZED) {
        onError && onError("unauthorized");

      }
    } catch (error) {
      onError && onError(error);
    }
  });
}

function* watchGetNewAccessToken() {
  yield takeEvery(getAccessTokenByRefreshTokenAction.type, function* ({ payload }: any): Generator<any, void, any> {
    const { onSuccess, onError } = payload;
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      if (refresh_token === null) {
        onError && onError();
        return;
      }
      const res = yield call(GetNewAccessTokenApi, refresh_token);
      console.log("res: ", res)
    } catch (error) {
      console.log(error)
      onError && onError();
    }
  });
}

export default function* AuthSaga() {
  yield all([
    fork(watchLogin),
    fork(watchGetProfile),
    fork(watchGetNewAccessToken),
  ]);
}

import { all, call, fork, put, takeEvery } from "@redux-saga/core/effects";
import actions from "./action";
import { _test } from "./slice";
import { TestAPI } from "@/api/TestApi";
function* watchTest() {
  yield takeEvery(actions.TEST, function* (payload): Generator<any, void, any> {
    try {
      const res = yield call(TestAPI, payload);
      yield put(
        _test({
          message: res.message
        })
      );
    } catch (error) {
    } finally {
    }
  });
}

export default function* TestSaga() {
  yield all([
    fork(watchTest),

  ]);
}
import { all } from 'redux-saga/effects'
import TestSaga from "@/redux/test/saga";


export default function* rootSaga() {
    yield all([
        TestSaga(),
    ])
}
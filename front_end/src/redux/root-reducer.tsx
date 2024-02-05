import { combineReducers } from 'redux';
import TestReducer from "@/redux/test/slice";

const rootReducer = combineReducers({
    Test: TestReducer,
});

export default rootReducer;
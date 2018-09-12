import { takeLatest } from "redux-saga/effects";
import {
  DECREMENT,
  DECREMENT_ASYNC,
  INCREMENT,
  INCREMENT_ASYNC
} from "../actions/counter/counterConstants";
import { onDecrement, onDecrementAsync, onIncrement, onIncrementAsync } from "./counter";

export default function* rootSaga() {
  yield takeLatest(DECREMENT, onDecrement),
  yield takeLatest(DECREMENT_ASYNC, onDecrementAsync);
  yield takeLatest(INCREMENT, onIncrement);
  yield takeLatest(INCREMENT_ASYNC, onIncrementAsync);
}

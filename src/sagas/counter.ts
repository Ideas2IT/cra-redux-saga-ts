import { delay } from "redux-saga";
import { put } from "redux-saga/effects";

import { decrementAsyncSuccess, decrementSuccess, incrementAsyncSuccess, incrementSuccess } from "../actions/counter/counter";
// import { fetchData } from "./api";

// worker Saga: will be fired on INCREMENT actions
function* onIncrement() {
  try {
    // do api call
    // const data = yield call(fetchData);
    yield put(incrementSuccess());
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
}

// worker Saga: will be fired on ASYNC INCREMENT actions
function* onIncrementAsync() {
  try {
    yield delay(3000);
    yield put(incrementAsyncSuccess());
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
}

// worker Saga: will be fired on DECREMENT actions
function* onDecrement() {
  try {
    yield put(decrementSuccess());
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
}

// worker Saga: will be fired on ASYNC DECREMENT actions
function* onDecrementAsync() {
  try {
    yield delay(3000);
    yield put(decrementAsyncSuccess());
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
}

export {
  onDecrement,
  onDecrementAsync,
  onIncrement,
  onIncrementAsync
};

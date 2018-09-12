import { put } from "redux-saga/effects";

import { decrementSuccess, incrementSuccess } from "../actions/counter/counter";
// import { fetchData } from "./api";

// worker Saga: will be fired on INCREMENT actions
function* onIncrement(action: any) {
  try {
    // do api call
    // const data = yield call(fetchData);
    yield put(incrementSuccess());
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
}

// worker Saga: will be fired on DECREMENT actions
function* onDecrement(action: any) {
    try {
      // do api call
      // const data = yield call(fetchData);
      yield put(decrementSuccess());
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }

 export {
    onDecrement,
    onIncrement
 }
import {
  DECREMENT,
  DECREMENT_ASYNC,
  DECREMENT_ASYNC_SUCCESS,
  DECREMENT_SUCCESS,
  INCREMENT,
  INCREMENT_ASYNC,
  INCREMENT_ASYNC_SUCCESS,
  INCREMENT_SUCCESS
} from "./counterConstants";

export const increment = () => {
  return { type: INCREMENT };
};

export const incrementAsync = () => ({
  type: INCREMENT_ASYNC
});

export const incrementSuccess = () => ({
  type: INCREMENT_SUCCESS
});

export const incrementAsyncSuccess = () => ({
  type: INCREMENT_ASYNC_SUCCESS
});

export const decrement = () => ({
  type: DECREMENT
});

export const decrementAsync = () => ({
  type: DECREMENT_ASYNC
});

export const decrementSuccess = () => ({
  type: DECREMENT_SUCCESS
});

export const decrementAsyncSuccess = () => ({
  type: DECREMENT_ASYNC_SUCCESS
});

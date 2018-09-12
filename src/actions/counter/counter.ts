import {
  DECREMENT,
  DECREMENT_SUCCESS,
  INCREMENT,
  INCREMENT_SUCCESS
} from "./counterConstants";

export const increment = () => ({
  type: INCREMENT,
})

export const incrementSuccess = () => ({
  type: INCREMENT_SUCCESS,
})

export const decrement = () => ({
  type: DECREMENT,
})

export const decrementSuccess = () => ({
  type: DECREMENT_SUCCESS,
})

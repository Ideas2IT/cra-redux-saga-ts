import { Action } from "redux";
import {
  DECREMENT,
  DECREMENT_ASYNC,
  DECREMENT_ASYNC_SUCCESS,
  DECREMENT_SUCCESS,
  INCREMENT,
  INCREMENT_ASYNC,
  INCREMENT_ASYNC_SUCCESS,
  INCREMENT_SUCCESS
} from "../actions/counter/counterConstants";

interface ICounterReducer {
  count: number,
  isLoading: boolean
}

const initialState = {
  count: 0,
  isLoading: false
};

const counterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        isLoading: true
      };
    case INCREMENT_SUCCESS:
      return {
        ...state,
        count: state.count + 1,
        isLoading: false
      };
    case INCREMENT_ASYNC:
      return {
        ...state,
        isLoading: true
      };
    case INCREMENT_ASYNC_SUCCESS:
      return {
        ...state,
        count: state.count + 1,
        isLoading: false
      };
    case DECREMENT:
      return {
        ...state,
        isLoading: true
      };
    case DECREMENT_SUCCESS:
      return {
        ...state,
        count: state.count - 1,
        isLoading: false
      };
    case DECREMENT_ASYNC:
      return {
        ...state,
        isLoading: true
      };
    case DECREMENT_ASYNC_SUCCESS:
      return {
        ...state,
        count: state.count - 1,
        isLoading: false
      };
    default:
      return state;
  }
};

export { counterReducer, ICounterReducer };

import { Action } from "redux";
import {
  DECREMENT,
  DECREMENT_SUCCESS,
  INCREMENT,
  INCREMENT_SUCCESS
} from "../actions/counter/counterConstants";

const counterReducer = (state = 0, action: Action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
      case INCREMENT_SUCCESS:
        return state;
      case DECREMENT_SUCCESS:
        return state;
    default:
      return state;
  }
}

export default counterReducer;

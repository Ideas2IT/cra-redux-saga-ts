import { RouterState } from 'connected-react-router';
import { localizeReducer } from 'react-localize-redux';
import { combineReducers } from 'redux';
import { counterReducer, ICounterReducer } from './counter';

const rootReducer = combineReducers({
  counter: counterReducer,
  localize: localizeReducer
});

export interface IState {
  counter: ICounterReducer,
  languageSelection: any,
  router: RouterState
}

export default rootReducer;

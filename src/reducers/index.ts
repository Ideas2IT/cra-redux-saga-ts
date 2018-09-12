import { RouterState } from 'connected-react-router';
import { localizeReducer } from 'react-localize-redux';
import { combineReducers } from 'redux';
import { counterReducer, ICounterReducer } from './counter';
import themeReducer from './theme';

const rootReducer = combineReducers({
  counter: counterReducer,
  localize: localizeReducer,
  theme: themeReducer
});

export interface IState {
  counter: ICounterReducer,
  languageSelection: any,
  router: RouterState,
  theme: any
}

export default rootReducer;

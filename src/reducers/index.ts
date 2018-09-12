import { RouterState } from 'connected-react-router';
import { localizeReducer } from 'react-localize-redux';
import { combineReducers } from 'redux';
import counterReducer from './counter';
import themeReducer from './theme';

const rootReducer = combineReducers({
  count: counterReducer,
  localize: localizeReducer,
  theme: themeReducer
})

export interface IState {
  count: number,
  languageSelection: any,
  router: RouterState,
  theme: any
}

export default rootReducer

import {
  CHANGE_THEME
} from "../actions/theme/themeConstants";

const inititalState = {
  activeTheme: 'theme1'
};

const themeReducer = (state = inititalState, action: any) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        activeTheme: action.selectedTheme
      };
    default:
      return {
        ...state
      };
  }
};

export default themeReducer;

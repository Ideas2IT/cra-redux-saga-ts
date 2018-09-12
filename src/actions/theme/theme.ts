import {
  CHANGE_THEME
} from "./themeConstants";

export const changeTheme = (selectedTheme: string) => ({
  selectedTheme,
  type: CHANGE_THEME
});

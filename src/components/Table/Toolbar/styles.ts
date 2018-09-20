import { StyleRules, Theme } from "@material-ui/core/styles";
import { lighten } from "@material-ui/core/styles/colorManipulator";

export const styleClasses = {
  actions: {
    color: ""
  },
  highlight: {
    backgroundColor: "",
    color: ""
  },
  root: "",
  spacer: "",
  title: ""
};

export const styles = (theme: Theme): StyleRules<any> => ({
  actions: {
    color: theme.palette.text.secondary
  },
  highlight:
    theme.palette.type === "light"
      ? {
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          color: theme.palette.secondary.main
        }
      : {
          backgroundColor: theme.palette.secondary.dark,
          color: theme.palette.text.primary
        },
  root: {
    paddingRight: theme.spacing.unit
  },
  spacer: {
    flex: "1 1 100%"
  },
  title: {
    flex: "0 0 auto"
  }
});

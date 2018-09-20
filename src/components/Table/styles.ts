import { StyleRulesCallback, Theme } from "@material-ui/core/styles";
export type ITableStyleProps = "root" | "table" | "tableWrapper";
export const styles: StyleRulesCallback<ITableStyleProps> = (theme: Theme) => ({
  loader: {
    height: 3
  },
  root: {
    alignSelf: "center",
    margin: "auto",
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    width: "95%"
  },
  table: {
    minWidth: 1020
  },
  tableRowWrapper: {
    "&:hover": {
      cursor: "pointer",
      // boxShadow: "1px 2px 1px 0px #ccc",
      transition: "all .1s ease-in-out"
    }
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

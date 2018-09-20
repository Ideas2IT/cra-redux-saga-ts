import { IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon
} from "@material-ui/icons";
import classNames from "classnames";
import * as React from "react";
import { styleClasses, styles } from "./styles";

interface ITableToolBarProps {
  classes: any;
  numSelected: number;
  title: string;
}

class TableToolbar extends React.Component<
  ITableToolBarProps & WithStyles<keyof typeof styleClasses>
> {
  public render() {
    const { numSelected, classes, title } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title" id="tableTitle">
              {title}
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  }
}
export default withStyles(styles)(TableToolbar);

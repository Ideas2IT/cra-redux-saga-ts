import Checkbox from "@material-ui/core/Checkbox";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Fragment } from "react";
import * as React from "react";
import TableHeader from "./Header";
import { ITableStyleProps, styles } from "./styles";
import TableToolbar from "./Toolbar";

export interface ITableProps extends ITableRequiredProps {
  classes: any;
}

/**
 * Required Table Props to handle pagination and sort
 */
export interface ITableRequiredProps {
  cols: any[];
  data: object[];
  enableSelect?: boolean;
  page: number;
  totalCount: number;
  rowsPerPage: number;
  loading: boolean;
  title: string;
  rowProps: {
    onClick?: (event: any, data: any) => void;
  };
  onSort?: (
    rowsPerPage: number,
    page: number,
    order: string,
    orderBy: string
  ) => void;
  onSelectAll?: (selectedDataIds: any[]) => void;
  onSelect?: (selectedData: any) => void;
  onPageChange?: (page: number, noOfRows: number) => void;
}

interface IRowDataProps {
  id: never;
}

export type orderType = "asc" | "desc";

interface ITableState {
  order: orderType;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  selected: object[];
}
/**
 * Responsive Table with pagination
 * @doc: https://material-ui.com/api/table-pagination
 */
class TableResponsive extends React.Component<
  ITableProps & WithStyles<ITableStyleProps>,
  ITableState
> {
  constructor(props: ITableProps & WithStyles<ITableStyleProps>) {
    super(props);
    const { page, rowsPerPage } = this.props;
    this.state = {
      order: "asc",
      orderBy: "",
      page,
      rowsPerPage,
      selected: []
    };
  }

  public render() {
    const {
      classes,
      cols,
      enableSelect,
      data,
      title,
      totalCount,
      loading
    } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - data.length;
    return (
      <Paper className={classes.root}>
        <TableToolbar title={title} numSelected={selected.length} />
        {(loading && (
          <LinearProgress className={classes.loader} color="secondary" />
        )) ||
          null}
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHeader
              cols={cols}
              enableSelect={enableSelect}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.map((datum: IRowDataProps) => this.renderTableRow(datum))}
              {(emptyRows &&
                (!loading ||
                  Math.round(totalCount / rowsPerPage) - 1 === page) && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )) ||
                null}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }

  private handleRequestSort = (event: any, property: any) => {
    const { onSort } = this.props;
    const { rowsPerPage, page } = this.state;
    const orderBy = property;
    let order: orderType = "desc";
    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }
    this.setState({ order, orderBy }, () => {
      if (onSort) {
        onSort(rowsPerPage, page, order, orderBy);
      }
    });
  }

  private handleSelectAllClick = (event: any) => {
    const { onSelectAll } = this.props;
    const selected = event.target.checked
      ? this.props.data.map((n: any) => n.id)
      : [];
    if (onSelectAll) {
      onSelectAll(selected);
    }
    this.setState({ selected });
  }

  private handleSelect = (event: any, data: any) => {
    const { selected } = this.state;
    const { onSelect } = this.props;
    const selectedIndex = selected.indexOf(data.id);
    let newSelected: any[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, data.id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    if (onSelect) {
      onSelect(data);
    }
    this.setState({ selected: newSelected });
  }

  private handleChangePage = (event: any, page: any) => {
    const { onPageChange } = this.props;
    const { rowsPerPage } = this.state;
    this.setState({ page }, () => {
      if (onPageChange) {
        onPageChange(page, rowsPerPage);
      }
    });
  }

  private handleChangeRowsPerPage = (event: any) => {
    const { onPageChange } = this.props;
    const { page } = this.state;
    const rowsPerPage = event.target.value;
    this.setState({ rowsPerPage }, () => {
      if (onPageChange) {
        onPageChange(page, rowsPerPage);
      }
    });
  }

  /**
   * TableRow
   * => rowProps are passed down to each row
   */
  private renderTableRow = (data: IRowDataProps) => {
    const isSelected = this.isSelected(data.id);
    const { cols, rowProps, classes, enableSelect } = this.props;
    const { onClick } = rowProps;
    return (
      <TableRow
        hover={Boolean(onClick)}
        role="checkbox"
        {...{
          className: onClick ? classes.tableRowWrapper : "",
          onClick: (event: any) => onClick && onClick(event, data)
        }}
        aria-checked={isSelected}
        tabIndex={-1}
        key={data.id}
        selected={isSelected}
      >
        {cols.map((col: any, index: number) => (
          <Fragment key={`${data.id}-${index}`}>
            {enableSelect &&
              !index && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    onChange={event => this.handleSelect(event, data)}
                  />
                </TableCell>
              )}
            <TableCell {...col.cellProps}>
              {col.cellRenderer ? col.cellRenderer(data) : data[col.dataKey]}
            </TableCell>
          </Fragment>
        ))}
      </TableRow>
    );
  }

  private isSelected = (id: never) => this.state.selected.indexOf(id) !== -1;
}

export default withStyles(styles)(TableResponsive);

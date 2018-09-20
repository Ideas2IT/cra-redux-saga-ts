import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import * as React from "react";
import { orderType } from "../index";
interface ITableHeader {
  enableSelect?: boolean;
  numSelected: number;
  onRequestSort: (event: any, data: any) => void;
  onSelectAllClick: (event: any) => void;
  order: orderType;
  orderBy: string;
  cols: object[];
  rowCount: number;
}

export default class TableHeader extends React.Component<ITableHeader> {
  public createSortHandler = (property: any) => (event: any) => {
    this.props.onRequestSort(event, property);
  }
  public render() {
    const {
      enableSelect,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;
    return (
      <TableHead>
        <TableRow>
          {enableSelect && (
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
          )}
          {this.props.cols.map((col: any, index: number) => {
            return (
              <TableCell
                key={index}
                {...col.cellProps}
                sortDirection={orderBy === col.dataKey ? order : false}
              >
                {col.sortable ? (
                  <Tooltip title="Sort" enterDelay={300}>
                    <TableSortLabel
                      active={orderBy === col.dataKey}
                      direction={order}
                      onClick={this.createSortHandler(col.dataKey)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </Tooltip>
                ) : (
                  col.label
                )}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

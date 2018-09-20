import { Grid } from "@material-ui/core";
import * as React from "react";
import { LocalizeContextProps, withLocalize } from "react-localize-redux";
import { withRouter } from "react-router";
import compose from "recompose/compose";
import Table from "../../components/Table";

interface IUserProps extends LocalizeContextProps {
  value: string;
  activeLanguage: any;
  users: any[];
  classes: any;
}

interface IUserState {
  tableData: object[];
  loading: boolean;
}

// tslint:disable:no-console
class User extends React.PureComponent<IUserProps, IUserState> {
  public tableProps: any;
  private data: object[];
  constructor(props: IUserProps) {
    super(props);
    this.data = [
      {
        age: 45,
        email: "yogaraj@gmail.com",
        id: 0,
        mobileNumber: 9966666865,
        name: "Yogaraj"
      },
      {
        age: 23,
        email: "kosal@gmail.com",
        id: 1,
        mobileNumber: 9864855232,
        name: "kosal"
      },
      {
        age: 25,
        email: "kovendhan@gmail.com",
        id: 2,
        mobileNumber: 9854853248,
        name: "kovendhan"
      },
      {
        age: 22,
        email: "adam@gmail.com",
        id: 3,
        mobileNumber: 9848425152,
        name: "Adam"
      },
      {
        age: 25,
        email: "Bruce@gmail.com",
        id: 4,
        mobileNumber: 98879788756,
        name: "bruce"
      },
      {
        age: 33,
        email: "Honeycomb@gmail.com",
        id: 5,
        mobileNumber: 9875465846,
        name: "Wiiliams"
      },
      {
        age: 23,
        email: "grace@gmail.com",
        id: 6,
        mobileNumber: 9898854546,
        name: "Grace"
      },
      {
        age: 23,
        email: "jack@gmail.com",
        id: 7,
        mobileNumber: 9498754698,
        name: "Jack"
      },
      {
        age: 26,
        email: "Kirthika@gmail.com",
        id: 8,
        mobileNumber: 99856456545,
        name: "Kitrthika"
      },
      {
        age: 25,
        email: "Lokesh@gmail.com",
        id: 29,
        mobileNumber: 98543513513,
        name: "Lokesh"
      },
      {
        age: 26,
        email: "shridhar@gmail.com",
        id: 922,
        mobileNumber: 95684654565,
        name: "Marshmallow"
      },
      {
        age: 30,
        email: "wanderwaal@gmail.com",
        id: 11,
        mobileNumber: 85564654666,
        name: "Wandervaal"
      }
    ];
    this.state = {
      loading: false,
      tableData: this.data.slice(0, 5)
    };
    this.tableProps = {
      cols: [
        {
          cellProps: {
            component: "th",
            padding: "default",
            scope: "row"
          },
          cellRenderer: (data: any) => `${data.name}`,
          dataKey: "name",
          dataType: String,
          label: "Name",
          sortable: true
        },
        {
          cellProps: {
            padding: "default"
          },
          dataKey: "email",
          dataType: Number,
          label: "Email",
          sortable: true
        },
        {
          cellProps: {
            padding: "default"
          },
          dataKey: "age",
          dataType: Number,
          disablePadding: false,
          label: "Age",
          sortable: true
        },
        {
          cellProps: {
            padding: "default"
          },
          dataKey: "mobileNumber",
          dataType: Number,
          disablePadding: false,
          label: "MobileNumber"
        }
      ],
      enableSelect: true,
      onPageChange: this.onPageChange,
      onSelect: (selectedRow: any) => console.log("selectedRow", selectedRow),
      onSelectAll: (data: any[]) => console.log("slectAllClick", data),
      onSort: (
        rowsPerPage: number,
        page: number,
        order: string,
        orderBy: string
      ) => {
        console.log("SortDataProps", {
          order,
          orderBy,
          page,
          rowsPerPage
        });
        this.localSort(rowsPerPage, page, order, orderBy);
      },
      page: 0,
      rowProps: {
        onClick: (event: any, rowData: any) => console.log("rowClick", rowData)
      },
      rowsPerPage: 5,
      title: "Nutrition",
      totalCount: this.data.length
    };
  }

  public render() {
    return (
      <Grid container={true}>
        <Grid item={true} lg={12} container={true}>
          <Table
            {...this.tableProps}
            loading={this.state.loading}
            data={this.state.tableData}
          />
        </Grid>
      </Grid>
    );
  }

  /**
   * Simulate Local Sort
   */
  private localSort = (
    rowsPerPage: number,
    page: number,
    order: string,
    orderBy: string
  ) => {
    this.setState({ loading: true });
    let { data } = this;
    data = this.stableSort(data, this.getSorting(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    setTimeout(() => this.setState({ tableData: data, loading: false }), 1000);
  }

  /**
   * Simulated Local Pagenate
   */
  private onPageChange = (page: number, rowsPerPage: number) => {
    this.setState({ loading: true });
    let { data } = this;
    data = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setTimeout(() => this.setState({ tableData: data, loading: false }), 1000);
  }

  /**
   * sort by keys
   */
  private desc(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  private stableSort(array: any, cmp: any) {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
  }

  private getSorting(order: any, orderBy: any) {
    return order === "desc"
      ? (a: any, b: any) => this.desc(a, b, orderBy)
      : (a: any, b: any) => -this.desc(a, b, orderBy);
  }
}

export default compose(
  withRouter,
  withLocalize
)(User);

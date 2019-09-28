import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Blue from "@material-ui/core/colors/blue";
import Container from "@material-ui/core/Container";

import axios from "axios";
/*
let counter = 0;
function createData(name, role, email, phone, clients) {
  counter += 1;
  return { id: counter, name, role, email, phone, clients };
}
*/
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: "account_last", disablePadding: true, label: "Account Holder" },
  { id: "client_last", disablePadding: true, label: "Client" },
  { id: "account_type", disablePadding: true, label: "Account Type" },
  { id: "phone", disablePadding: true, label: "Phone" },
  { id: "email", disablePadding: true, label: "Email" },
  { id: "method", disablePadding: true, label: "Payment Method" },
  { id: "bal", disablePadding: true, label: "Balance" },
  { id: "last_pay_date", label: "Last Payment Date" }
];

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: Blue[800],
    color: theme.palette.common.white,
    fontSize: 17
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

class AccountsTableV3Head extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <CustomTableCell padding="checkbox">
            <MuiThemeProvider theme={theme}>
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
                color="primary"
              />
            </MuiThemeProvider>
          </CustomTableCell>
          {rows.map(
            row => (
              <CustomTableCell
                key={row.id}
                align="center"
                sortDirection={orderBy === row.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={this.createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </CustomTableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

AccountsTableV3Head.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  // previous file
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
  //rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    //width: "60%",
    marginTop: theme.spacing(1) * 3,
    // marginLeft: theme.spacing(1) * 30,
    overflowX: "auto"
  },
  table: {
    //minWidth: 1020,
  },
  tableWrapper: {
    overflowX: "auto"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  appBar: {
    position: "relative",
    backgroundColor: Blue[800]
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
    //width: 400
  },
  textField2: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 198
  },
  textField3: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "60%"
  },

  root2: {
    marginTop: theme.spacing(10)
  },
  letter: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(5)
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { main: "#b2dfdb" }
  }
});

const theme2 = createMuiTheme({
  palette: {
    primary: { main: "#00838f" }
  }
});

class AccountsTableV3 extends React.Component {
  state = {
    order: "",
    orderBy: "",
    accountData: [],
    page: 0,
    rowsPerPage: 10,
    selected: [],
    open: false
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/accounts")
      .then(response => {
        console.log("Got account data!");
        console.log(response.data);
        this.setState({
          accountData: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
      console.log("Account interval set!");
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
      console.log("Unmounted from account data!");
    }
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.accountData.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

    this.setState({ selected: newSelected });
  };

  // prev file -->

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const {
      accountData,
      order,
      orderBy,
      rowsPerPage,
      page,
      selected
    } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, accountData.length - page * rowsPerPage);

    return (
      <Container maxWidth="lg">
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table /* className={classes.table} */ aria-labelledby="tableTitle">
              <AccountsTableV3Head
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                onSelectAllClick={this.handleSelectAllClick}
                rowCount={accountData.length}
              />
              <TableBody>
                {stableSort(accountData, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        className={classes.row}
                        onClick={event => this.handleClick(event, n.id)}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <MuiThemeProvider theme={theme}>
                            <Checkbox color="primary" checked={isSelected} />
                          </MuiThemeProvider>
                        </TableCell>

                        <TableCell align="center">
                          {n.account_last}, {n.account_first}
                        </TableCell>
                        <TableCell align="center">
                          {n.client_last}, {n.client_first}
                        </TableCell>
                        <TableCell align="center">{n.account_type}</TableCell>
                        <TableCell align="center">{n.phone}</TableCell>
                        <TableCell align="center">{n.email}</TableCell>
                        <TableCell align="center">{n.method}</TableCell>
                        <TableCell align="center">{n.bal}</TableCell>
                        <TableCell align="center">{n.last_pay_date}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={accountData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    );
  }
}

AccountsTableV3.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountsTableV3);

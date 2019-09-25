import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Cyan from "@material-ui/core/colors/cyan";
import Container from "@material-ui/core/Container";
import { Redirect, Link } from "react-router-dom";

import axios from "axios";

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
  { id: "client_first_name", disablePadding: true, label: "First" },
  { id: "client_last_name", disablePadding: true, label: "Last" },
  { id: "phone", disablePadding: true, label: "Phone" },
  { id: "email", disablePadding: true, label: "Email" },
  { id: "assi_therapist_full_name", disablePadding: true, label: "Therapist" },
  { id: "facility", label: "Facility" }
];

const CustomTableCell = withStyles(theme => ({
  head: {
    //backgroundColor: lightBlue[400],
    backgroundColor: Cyan[800],
    color: theme.palette.common.white,
    fontSize: 18
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <CustomTableCell
                key={row.id}
                align="center"
                padding={row.disablePadding ? "none" : "default"}
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

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
  //rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    //width: "60%",
    marginTop: theme.spacing.unit * 3,
    // marginLeft: theme.spacing.unit * 30,
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
    backgroundColor: Cyan[800]
  },
  flex: {
    flex: 1
  }
});

const navStyle = {
  color: "black",
  textDecoration: "none"
};

class ClientsTableActive extends React.Component {
  state = {
    order: "",
    open: false,
    orderBy: "",
    clientData: [],
    selectedIndex: null,
    page: 0,
    rowsPerPage: 10,
    redirect: false
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/clients/active")
      .then(response => {
        console.log("Got active client data!");
        console.log(response.data);
        this.setState({
          clientData: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
      console.log("Active client interval set!");
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
      console.log("Unmounted from active client data!");
    }
  }

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

  //redirect to client details;
  handleClickRedirect = () => {
    this.setState({ redirect: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { clientData, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, clientData.length - page * rowsPerPage);

    return (
      <Container maxWidth="lg">
        {this.state.redirect ? (
          <Redirect to="/clients/hideinactive/details" />
        ) : null}
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table /* className={classes.table} */ aria-labelledby="tableTitle">
              <EnhancedTableHead
                //numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={clientData.length}
              />
              <TableBody>
                {stableSort(clientData, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    // const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        className={classes.row}
                        tabIndex={-1}
                        key={n.id}
                        onClick={this.handleClickRedirect}
                      >
                        <TableCell align="center">
                          {n.client_first_name}
                        </TableCell>
                        <TableCell align="center">
                          {n.client_last_name}
                        </TableCell>
                        <TableCell align="center">{n.phone}</TableCell>
                        <TableCell align="center">{n.email}</TableCell>
                        <TableCell align="center">
                          {n.assi_therapist_full_name}
                        </TableCell>
                        <TableCell align="center">{n.facility}</TableCell>
                        {/* <TableCell align="center">{n.clients}</TableCell> */}
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
            count={clientData.length}
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

ClientsTableActive.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientsTableActive);

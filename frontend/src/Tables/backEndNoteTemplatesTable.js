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
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Cyan from "@material-ui/core/colors/cyan";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

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
  { id: "template", label: "Template" },
  { id: "visibleToTherapist", label: "Visible to Therapist" },
  { id: "dateCreated", label: "Date Created" }
  // Prev File
  /*   { id: "name", label: "Name" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "therapist", label: "Therapist" },
  { id: "facility", label: "Facility" } */
  // { id: "clients", label: "Clients" }
];

const CustomTableCell = withStyles(theme => ({
  head: {
    //backgroundColor: lightBlue[400],
    backgroundColor: Cyan[800],
    color: theme.palette.common.white,
    fontSize: 15
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

class NoteTemplatesTableHead extends React.Component {
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
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
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

NoteTemplatesTableHead.propTypes = {
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
    backgroundColor: Cyan[800]
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

class NoteTemplatesTable extends React.Component {
  state = {
    order: "",
    orderBy: "",
    templateData: [],
    page: 0,
    rowsPerPage: 5,
    selected: [],
    open: false
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/templates")
      .then(response => {
        console.log("Got template data!");
        console.log(response.data);
        this.setState({
          templateData: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
      console.log("Template interval set!");
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
      console.log("Unmounted from template data!");
    }
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.templateData.map(n => n.id) }));
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
      templateData,
      order,
      orderBy,
      rowsPerPage,
      page,
      selected
    } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, templateData.length - page * rowsPerPage);

    return (
      <Container maxWidth="lg">
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table /* className={classes.table} */ aria-labelledby="tableTitle">
              <NoteTemplatesTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                onSelectAllClick={this.handleSelectAllClick}
                rowCount={templateData.length}
              />
              <TableBody>
                {stableSort(templateData, getSorting(order, orderBy))
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
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell onClick={this.handleOpen} align="center">
                          {n.template_name}
                        </TableCell>
                        <TableCell align="center">{n.visible}</TableCell>
                        <TableCell align="center">{n.created}</TableCell>
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
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={templateData.length}
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
        <Dialog fullScreen open={this.state.open} onClose={this.handleClose}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Note Template Builder
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                Save
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container direction="row">
            <Typography variant="h5" className={classes.letter}>
              S
            </Typography>
            <TextField
              id="standard-full-width"
              //label="S"
              //style={{ margin: 8 }}
              className={classes.textField3}
              //placeholder="Add notes here"
              //fullWidth
              variant="outlined"
              multiline
              rows="2"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid container direction="row">
            <Typography variant="h5" className={classes.letter}>
              O
            </Typography>
            <TextField
              id="standard-full-width"
              //label="O"
              //style={{ margin: 8 }}
              className={classes.textField3}
              //placeholder="Add notes here"
              //fullWidth
              variant="outlined"
              multiline
              rows="2"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid container direction="row">
            <Typography variant="h5" className={classes.letter}>
              A
            </Typography>
            <TextField
              id="standard-full-width"
              //label="A"
              //style={{ margin: 8 }}
              className={classes.textField3}
              //placeholder="Add notes here"
              //fullWidth
              variant="outlined"
              multiline
              rows="2"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid container direction="row">
            <Typography variant="h5" className={classes.letter}>
              P
            </Typography>
            <TextField
              id="standard-full-width"
              //label="P"
              //style={{ margin: 8 }}
              className={classes.textField3}
              //placeholder="Add notes here"
              //fullWidth
              variant="outlined"
              multiline
              rows="2"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
        </Dialog>
      </Container>
    );
  }
}

NoteTemplatesTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NoteTemplatesTable);

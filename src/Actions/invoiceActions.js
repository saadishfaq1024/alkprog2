import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Mouse from "@material-ui/icons/Mouse";
import Search from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

moment().toDate();

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    align: "center"
    // width: "31%"
  },

  button: {
    margin: theme.spacing(1),
    align: "center",
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  dialogTitle: {
    marginBottom: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  textField2: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  menu: {
    width: 200
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

const transactionType = [
  {
    value: "Charge",
    label: "Charge"
  },

  {
    value: "Discount",
    label: "Discount"
  },

  {
    value: "Payment",
    label: "Payment"
  },

  {
    value: "Refund",
    label: "Refund"
  }
];

const paymentMethod = [
  {
    value: "Card",
    label: "Card"
  },

  {
    value: "Cash",
    label: "Cash"
  },
  {
    value: "Check",
    label: "Check"
  }
];

const payor = [
  {
    value: "Mary Smith",
    label: "Mary Smith"
  },

  {
    value: "Jack Johnson",
    label: "Jack Johnson"
  }
];

class InvoiceActions extends React.Component {
  state = {
    anchorEl: null,
    openInvoices: false,
    openDateRange: false,
    payor: null,
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    invoiceDate: moment().format("YYYY-MM-DD "),
    dueDate: moment().format("YYYY-MM-DD"),
    invoiceAmount: null,
    invoiceNotes: null
  };

  /* change of team member dropdown */
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  /* show invoices diaglog box */
  handleClickOpenInvoice = () => {
    this.setState({ openInvoices: true });
  };

  /* close invoices diaglog box */
  handleCloseInvoices = () => {
    this.setState({ openInvoices: false });
  };

  handleDateChangeStart = date => {
    this.setState({ startDate: date.format("YYYY-MM-DD" /*  HH:mm:ss */) });
  };

  handleDateChangeEnd = date => {
    this.setState({ endDate: date.format("YYYY-MM-DD") });
  };

  handleDateChangeEnd = date => {
    this.setState({ invoiceDate: date.format("YYYY-MM-DD") });
  };

  handleDateChangeDue = date => {
    this.setState({ dueDate: date.format("YYYY-MM-DD") });
  };

  /* Select menu options */
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Email</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Download</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Delete</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Void</MenuItem>
      </Menu>
    );

    return (
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Container maxWidth="sm">
            <Paper className={classes.root} elevation={7}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                {/* New Invoice button */}
                <Button
                  variant="contained"
                  onClick={this.handleClickOpenInvoice}
                  className={classes.button}
                >
                  <AddIcon
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  New Invoice
                </Button>
                {/* New Invoice dialog box */}
                <Dialog
                  open={this.state.openInvoices}
                  onClose={this.handleCloseInvoices}
                >
                  <DialogTitle id="form-dialog-title">New Invoice</DialogTitle>
                  <DialogContent>
                    {/* check prev balance */}
                    <TextField
                      id="standard-select-payor"
                      select
                      label="Payor"
                      variant="outlined"
                      margin="normal"
                      className={classes.textField}
                      value={this.state.payor}
                      onChange={this.handleChange("payor")}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                    >
                      {payor.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <MuiThemeProvider theme={theme}>
                      <TextField
                        id="standard-invoiceAmount"
                        label="Invoice Amount"
                        variant="outlined"
                        className={classes.textField}
                        value={this.state.invoiceAmount}
                        onChange={this.handleChange("invoiceAmount")}
                        margin="normal"
                      />
                    </MuiThemeProvider>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <Grid container row>
                        <MuiThemeProvider theme={theme2}>
                          <DatePicker
                            inputVariant="outlined"
                            margin="normal"
                            className={classes.textField}
                            label="Start Date"
                            value={this.state.startDate}
                            onChange={this.handleDateChangeStart}
                          />
                        </MuiThemeProvider>
                      </Grid>
                      <MuiThemeProvider theme={theme2}>
                        <Grid container row>
                          <DatePicker
                            inputVariant="outlined"
                            margin="normal"
                            className={classes.textField}
                            label="End Date "
                            value={this.state.endDate}
                            onChange={this.handleDateChangeEnd}
                          />
                        </Grid>
                      </MuiThemeProvider>
                      <MuiThemeProvider theme={theme2}>
                        <Grid container row>
                          <DatePicker
                            margin="normal"
                            inputVariant="outlined"
                            className={classes.textField}
                            label="Invoice Date "
                            value={this.state.invoiceDate}
                            onChange={this.handleDateChangeInvoice}
                          />
                        </Grid>
                      </MuiThemeProvider>
                      <MuiThemeProvider theme={theme2}>
                        <Grid container row>
                          <DatePicker
                            inputVariant="outlined"
                            margin="normal"
                            className={classes.textField}
                            label="Due Date "
                            value={this.state.dueDate}
                            onChange={this.handleDateChangeDue}
                          />
                        </Grid>
                      </MuiThemeProvider>
                    </MuiPickersUtilsProvider>

                    <TextField
                      id="standard-invoiceNotes"
                      label="Notes"
                      variant="outlined"
                      className={classes.textField}
                      value={this.state.invoiceNotes}
                      onChange={this.handleChange("invoiceNotes")}
                      margin="normal"
                    />
                  </DialogContent>
                  <MuiThemeProvider theme={theme2}>
                    <DialogActions>
                      <Button
                        onClick={this.handleCloseInvoices}
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={this.handleCloseInvoices}
                        color="primary"
                      >
                        Add
                      </Button>
                    </DialogActions>
                  </MuiThemeProvider>
                </Dialog>
                {/* Selected button */}
                <Button
                  variant="contained"
                  onClick={this.handleProfileMenuOpen}
                  className={classes.button}
                >
                  <Mouse
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Selected
                </Button>
                {renderMenu}

                {/* Search button */}
                <Button variant="contained" className={classes.button}>
                  <Search
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Search
                </Button>
                {/*
                <Button
                  variant="contained"
                  onClick={this.handleClickOpen2}
                  className={classes.button}
                >
                  <Visibility
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Show
                </Button>
   */}
              </Grid>
            </Paper>
          </Container>
        </Grid>
      </div>
    );
  }
}

InvoiceActions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InvoiceActions);

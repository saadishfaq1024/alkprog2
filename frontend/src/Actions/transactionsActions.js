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
import Search from "@material-ui/icons/Search";
import DateRange from "@material-ui/icons/DateRange";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import InputAdornment from "@material-ui/core/InputAdornment";
import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";

import axios from "axios";

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

const payors = [
  {
    value: "Mary Smith",
    label: "Mary Smith"
  },

  {
    value: "Jack Johnson",
    label: "Jack Johnson"
  }
];

class TransactionsActions extends React.Component {
  state = {
    anchorEl: null,
    openTransactions: false,
    openError: false,
    openDateRange: false,
    redirect: false,
    payor: "",
    payorData: [],
    date: moment().format("YYYY-MM-DD" /* HH:mm:ss */),
    description: "",
    transactionType: "",
    paymentMethod: "",
    amount: ""
  };

  /* change of team member dropdown */
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  /* show transactions diaglog box */
  handleClickOpenTransactions = () => {
    this.setState({ openTransactions: true });
  };

  /* close transactions diaglog box */
  handleCloseTransactions = () => {
    this.setState({ openTransactions: false });
  };

  /* show date range diaglog box */
  handleClickOpenDateRange = () => {
    this.setState({ openDateRange: true });
  };

  /* close date range diaglog box */
  handleCloseDateRange = () => {
    this.setState({ openDateRange: false });
  };

  handleDateChange = date => {
    this.setState({ date: date.format("YYYY-MM-DD") });
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/payors")
      .then(response => {
        console.log("Got payor data!");
        console.log(response.data);
        this.setState({
          payorData: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
      console.log("Payor interval set!");
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
      console.log("Unmounted from payor data!");
    }
  }

  onSubmit() {
    //experiment keeping preventDefault
    //e.preventDefault();

    const transObj = {
      payor: this.state.payor,
      date: this.state.date,
      description: this.state.description,
      transactionType: this.state.transactionType,
      paymentMethod: this.state.paymentMethod,
      amount: this.state.amount
    };
    axios.post("http://localhost:5000/putTrans", transObj).then(response => {
      this.setState({
        transObj
        //redirect: true
      });
    });
  }

  handleErrorOpen = () => {
    this.setState({ openError: true });
  };

  handleErrorClose = () => {
    this.setState({ openError: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog open={this.state.openError} onClose={this.handleErrorClose}>
          <DialogTitle>Please complete the required information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Any textboxes notated with an astersisk are considered required
              information
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleErrorClose}>Ok</Button>
          </DialogActions>
        </Dialog>

        <Grid container direction="row" justify="center" alignItems="center">
          <Container maxWidth="sm">
            <Paper className={classes.root} elevation={7}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                {/* New Transaction button */}
                <Button
                  variant="contained"
                  onClick={this.handleClickOpenTransactions}
                  className={classes.button}
                >
                  <AddIcon
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  New Transaction
                </Button>

                <Dialog
                  open={this.state.openTransactions}
                  onClose={this.handleCloseTransactions}
                >
                  <DialogTitle id="form-dialog-title">
                    New Transaction
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      id="standard-select-transactionType"
                      select
                      required
                      label="Transaction Type"
                      variant="outlined"
                      margin="normal"
                      className={classes.textField}
                      value={this.state.transactionType}
                      onChange={this.handleChange("transactionType")}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                    >
                      {transactionType.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="standard-select-paymentMethod"
                      required
                      select
                      label="Payment Method"
                      variant="outlined"
                      margin="normal"
                      className={classes.textField}
                      value={this.state.paymentMethod}
                      onChange={this.handleChange("paymentMethod")}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                    >
                      {paymentMethod.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="standard-select-payor"
                      required
                      select
                      label="Payor"
                      variant="outlined"
                      margin="normal"
                      type="search"
                      className={classes.textField}
                      value={this.state.payor}
                      onChange={this.handleChange("payor")}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                    >
                      {payors.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <MuiThemeProvider theme={theme}>
                      <TextField
                        id="standard-amount"
                        required
                        label="Amount (dollars)"
                        variant="outlined"
                        className={classes.textField}
                        value={this.state.amount}
                        onChange={this.handleChange("amount")}
                        margin="normal"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          )
                        }}
                      />
                    </MuiThemeProvider>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <Grid container row>
                        <MuiThemeProvider theme={theme2}>
                          <DatePicker
                            required
                            inputVariant="outlined"
                            margin="normal"
                            className={classes.textField}
                            label="Date"
                            value={this.state.date}
                            onChange={this.handleDateChange}
                          />
                        </MuiThemeProvider>
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <TextField
                      id="standard-description"
                      label="Description"
                      variant="outlined"
                      className={classes.textField}
                      value={this.state.description}
                      onChange={this.handleChange("description")}
                      margin="normal"
                    />
                  </DialogContent>
                  <MuiThemeProvider theme={theme2}>
                    <DialogActions>
                      <Button
                        onClick={this.handleCloseTransactions}
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => {
                          this.onSubmit(
                            this.state.payor,
                            this.state.date,
                            this.state.description,
                            this.state.transactionType,
                            this.state.paymentMethod,
                            this.state.amount
                          );
                        }}
                      >
                        Add
                      </Button>
                    </DialogActions>
                  </MuiThemeProvider>
                </Dialog>

                {this.state.redirect ? (
                  <Redirect push to="/accountsandinv/n" />
                ) : null}

                {/* Date range button */}
                <Button
                  variant="contained"
                  onClick={this.handleClickOpenDateRange}
                  className={classes.button}
                >
                  <DateRange
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Date Range
                </Button>

                {/* Date Range dialog box */}
                <Dialog
                  open={this.state.openDateRange}
                  onClose={this.handleCloseV}
                >
                  <DialogTitle id="form-dialog-title">Date Range</DialogTitle>
                  <DialogContent>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <Grid container row>
                        <MuiThemeProvider theme={theme2}>
                          <DatePicker
                            margin="normal"
                            inputVariant="outlined"
                            className={classes.textField2}
                            label="Payment Date"
                            value={this.state.paymentDate}
                            onChange={this.handleDateChangeStart}
                          />
                        </MuiThemeProvider>
                      </Grid>
                      <MuiThemeProvider theme={theme2}>
                        <Grid container row>
                          <DatePicker
                            margin="normal"
                            inputVariant="outlined"
                            className={classes.textField2}
                            label="End Date "
                            value={this.state.endDate}
                            onChange={this.handleDateChangeEnd}
                          />
                        </Grid>
                      </MuiThemeProvider>
                    </MuiPickersUtilsProvider>
                  </DialogContent>
                  <MuiThemeProvider theme={theme2}>
                    <DialogActions>
                      <Button
                        onClick={this.handleCloseDateRange}
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={this.handleCloseDateRange}
                        color="primary"
                      >
                        Ok
                      </Button>
                    </DialogActions>
                  </MuiThemeProvider>
                </Dialog>

                {/* Search button */}
                <Button variant="contained" className={classes.button}>
                  <Search
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Search
                </Button>
              </Grid>
            </Paper>
          </Container>
        </Grid>
      </div>
    );
  }
}

TransactionsActions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransactionsActions);

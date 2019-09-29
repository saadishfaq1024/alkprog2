import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

import axios from "axios";

const styles = theme => ({
  root: {
    // paddingTop: theme.spacing(1) * 2,
    //paddingBottom: theme.spacing(1) * 2,
    marginTop: theme.spacing(1) * 5
    // marginLeft: theme.spacing(1) * 33.5,
    //align: "center",
    // width: "175"
  },
  button: {
    //margin: theme.spacing(1),
    // width: 160
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

const clients = [
  {
    value: "John Smith",
    label: "John Smith"
  },

  {
    value: "Jill Smith",
    label: "Jill Smith"
  },
  {
    value: "Ashley Flowers",
    label: "Ashley Flowers"
  }
];

const sessionType = [
  {
    value: "Lessons",
    label: "Lessons"
  },

  {
    value: "Therapy",
    label: "Therapy"
  }
];

class AssignedClientActions extends React.Component {
  state = {
    member: "Harry Potter",
    clientData: [],
    open: false,
    clientFirst: "",
    clientLast: "",
    sessionCost: "",
    sessionLength: "",
    sessionType: ""
  };

  /* change of team member dropdown */
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  /* show assign client diaglog box */
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  /* close assign client diaglog box */
  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/clientlist")
      .then(response => {
        console.log("Got client data!");
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
      console.log("Client interval set!");
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
      console.log("Unmounted from client data!");
    }
  }

  onSubmit() {
    //experiment keeping preventDefault
    //e.preventDefault();

    const obj = {
      // client: this.state.client,
      clientFirst: this.state.clientFirst,
      clientLast: this.state.clientLast,
      sessionCost: this.state.sessionCost,
      sessionLength: this.state.sessionLength,
      sessionType: this.state.sessionType
    };
    axios
      .post("http://localhost:5000/assignClients/assignclient1", obj)
      .then(res => console.log(res.data));
    /* this will clear everything after saving+closing */

    this.setState({
      //client: this.state.client,
      clientFirst: this.state.clientFirst,
      clientLast: this.state.clientLast,
      sessionCost: this.state.sessionCost,
      sessionLength: this.state.sessionLength,
      sessionType: this.state.sessionType
    });
  }

  render() {
    const { classes } = this.props;
    const { clientData } = this.state;

    return (
      <div>
        <Grid
          container
          direction="row-reverse"
          justify="center"
          alignItems="center"
        >
          <Paper className={classes.root} elevation={7}>
            {/* Assign client button */}
            <Button
              variant="contained"
              onClick={this.handleClickOpen}
              className={classes.button}
            >
              <AddIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Assign Client
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
              <DialogTitle id="form-dialog-title">Assign Client</DialogTitle>
              <form className={classes.container} noValidate autoComplete="off">
                <DialogContent>
                  <TextField
                    id="standard-select-client"
                    select
                    label="Clients"
                    variant="outlined"
                    margin="normal"
                    className={classes.textField}
                    value={this.state.clientFirst + this.state.clientLast}
                    onChange={this.handleChange("clientFirst", "clientLast")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {clientData.map(option => (
                      <MenuItem
                        key={option.value}
                        value={option.first_name + option.last_name}
                      >
                        {option.first_name + " " + option.last_name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="standard-select-sessionType"
                    select
                    label="Session Type"
                    variant="outlined"
                    margin="normal"
                    className={classes.textField}
                    value={this.state.sessionType}
                    onChange={this.handleChange("sessionType")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {sessionType.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="standard-cost"
                    label="Session Cost (dollars)"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.sessionCost}
                    onChange={this.handleChange("sessionCost")}
                    margin="normal"
                  />
                  <TextField
                    id="standard-length"
                    label="Session Length (minutes)"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.sessionLength}
                    onChange={this.handleChange("sessionLength")}
                    margin="normal"
                  />
                </DialogContent>
              </form>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    this.onSubmit(
                      //this.state.client,
                      this.state.clientFirst,
                      this.state.clientLast,
                      this.state.sessionCost,
                      this.state.sessionLength,
                      this.state.sessionType
                    );
                    //this.reloadPage();
                  }}
                  color="primary"
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Grid>
      </div>
    );
  }
}

AssignedClientActions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AssignedClientActions);

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Cyan from "@material-ui/core/colors/cyan";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Switch, Link, Route } from "react-router-dom";

import axios from "axios";
//tttt

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: Cyan[800]
  },
  root3: {
    width: "100%"
  }
});

const navStyle = {
  color: "black",
  textDecoration: "none"
};

class OutlinedTextFields extends React.Component {
  state = {
    newFirstName: "",
    newLastName: "",
    newEmail: "",
    newOrg: "",
    newPass: "",
    newConfirmPass: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/users")
      .then(response => {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
      console.log("Unmounted!");
    }
  }

  onSubmit(e) {
    // e.preventDefault();
    const obj = {
      //title: this.state.title,
      newFirstName: this.state.newFirstName,
      newLastName: this.state.newLastName,
      newEmail: this.state.newEmail,
      newOrg: this.state.newOrg,
      newPass: this.state.newPass,
      newConfirmPass: this.state.newConfirmPass
    };
    axios
      .post("http://localhost:5000/users/register", obj)
      .then(res => console.log(res.data));

    /* this will clear everything after saving+closing */

    this.setState({
      newFirstName: "",
      newLastName: "",
      newEmail: "",
      newOrg: "",
      newPass: "",
      newConfirmPass: ""
    });
  }
  /*

  reloadPage() {
    // if (this.state.location !== prevState.location) {
    window.location.reload();
    console.log("Refresh!");
  }
  */

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {/* INSERT Logo HERE */}
          </Typography>
          <form noValidate className={classes.form}>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <TextField
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={this.state.newFirstName}
                  onChange={this.handleChange("newFirstName")}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={this.state.newLastName}
                  onChange={this.handleChange("newLastName")}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={this.state.newEmail}
                  onChange={this.handleChange("newEmail")}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="orgName"
                  label="Organization Name"
                  name="orgName"
                  value={this.state.newOrg}
                  onChange={this.handleChange("newOrg")}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  // tool tip to explain characters
                  label="Password"
                  type="password"
                  id="password1"
                  value={this.state.newPass}
                  onChange={this.handleChange("newPass")}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  value={this.state.newConfirmPass}
                  onChange={this.handleChange("newConfirmPass")}
                />
              </Grid>
            </Grid>
            <Button
              type="submitButton"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={() => {
                this.onSubmit(
                  //this.state.title,
                  this.state.newFirstName,
                  this.state.newLastName,
                  this.state.newEmail,
                  this.state.newOrg,
                  this.state.newPass,
                  this.state.newConfirmPass
                );
                //this.reloadPage();
              }}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Paper
                  elevation={0}
                  className={classes.root3}
                  // onClick={this.reloadPage}
                >
                  <Link style={navStyle} to="/signin">
                    Already have an account? Sign in
                  </Link>
                </Paper>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedTextFields);

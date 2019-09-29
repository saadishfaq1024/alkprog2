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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
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

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <Grid item container spacing={4}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                // autoFocus
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                //autoComplete="current-password"
              />
              <Button
                type="submitButton"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submitButton}
              >
                Sign In
              </Button>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Paper elevation={0} className={classes.root3}></Paper>
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

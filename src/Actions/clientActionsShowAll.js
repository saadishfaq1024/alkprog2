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
import Visibility from "@material-ui/icons/Visibility";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";
import { Redirect, Link } from "react-router-dom";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
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

const navStyle = {
  color: "black",
  textDecoration: "none"
};

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

class ClientActionsShowAll extends React.Component {
  state = {
    anchorEl: null,
    redirect: false
  };

  handleRedirect = () => {
    this.setState({
      redirect: true
    });
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
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Paper className={classes.root} elevation={7}>
                <Link style={navStyle} to="/clients/hideinactive/newclient">
                  {/* Add new client button */}
                  <Button
                    variant="contained"
                    className={classes.button}
                    //onClick={this.handleClickOpen}
                  >
                    <AddIcon
                      className={classNames(
                        classes.leftIcon,
                        classes.iconSmall
                      )}
                    />
                    Add New
                  </Button>
                </Link>
                {/* Show all button */}
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleRedirect}
                >
                  <Visibility
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Show All
                </Button>
              </Paper>
            </Grid>
          </Container>
          {this.state.redirect ? <Redirect push to="/clients" /> : null}
        </Grid>
      </div>
    );
  }
}

ClientActionsShowAll.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientActionsShowAll);

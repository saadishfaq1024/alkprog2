import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/ArrowBack";
import { Switch, Link, Route } from "react-router-dom";

const styles = theme => ({
  root: {
    padding: theme.spacing(1, 1),
    marginLeft: theme.spacing(-3),
    marginRight: theme.spacing(-3),
    marginTop: theme.spacing(-2.9)
  },
  root2: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "15.1%"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },

  backToButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  }
});

const navStyle = {
  color: "black",
  textDecoration: "none"
};

class titleBarMemberDetails extends React.Component {
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
      <div>
        <Paper className={classes.root} elevation={2}>
          <Typography align="center" variant="h5">
            Add New Team Member Details
          </Typography>
        </Paper>

        <Link style={navStyle} to="/teammembers">
          <Button
            className={classes.backToButton}
            size="small"
            variant="contained"
          >
            <BackIcon className={classes.extendedIcon} />
            Back to Team Members page
          </Button>
        </Link>
      </div>
    );
  }
}

titleBarMemberDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(titleBarMemberDetails);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(1) * 2,
    paddingBottom: theme.spacing(1) * 2,
    marginTop: theme.spacing(1) * 5,
    marginLeft: theme.spacing(1) * 33.5,
    align: "center",
    width: "175"
  },
  button: {
    margin: theme.spacing(1),
    width: 160
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
    open: false,
    client: "",
    cost: "",
    length: "",
    type: ""
  };

  /* change of client dropdown */
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

  render() {
    const { classes } = this.props;

    return (
      <div>
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
            <DialogContent>
              <TextField
                id="standard-select-client"
                select
                label="Clients"
                variant="outlined"
                margin="normal"
                className={classes.textField}
                value={this.state.clients}
                onChange={this.handleChange("clients")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {clients.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Assign
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </div>
    );
  }
}

AssignedClientActions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AssignedClientActions);

import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  floatButton: {
    marginTop: theme.spacing(4),
    margin: theme.spacing(1),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  dialogTitle: {
    marginBottom: theme.spacing(1)
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

class MemberUploadAction extends React.Component {
  state = {
    member: "Harry Potter",
    open: false,
    client: "",
    fileName: "",
    fileDescription: "",
    type: ""
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

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid
          container
          direction="row-reverse"
          justify="center"
          alignItems="center"
        >
          {/* Assign client button */}
          <Button
            variant="contained"
            onClick={this.handleClickOpen}
            className={classes.floatButton}
          >
            <AddIcon />
            Upload File
          </Button>
          <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle id="form-dialog-title">Upload File</DialogTitle>

            <DialogContent>
              <input
                accept=".pdf,.doc,.docx"
                className={classes.input}
                id="contained-button-file"
                //multiple
                type="file"
              />
              <MuiThemeProvider theme={theme}>
                <TextField
                  id="standard-fileName"
                  required
                  label="File Name"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.fileName}
                  onChange={this.handleChange("fileName")}
                  margin="normal"
                />
              </MuiThemeProvider>

              <TextField
                id="standard-description"
                label="Description"
                variant="outlined"
                className={classes.textField}
                value={this.state.fileDescription}
                onChange={this.handleChange("fileDescription")}
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Upload
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
}

MemberUploadAction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MemberUploadAction);

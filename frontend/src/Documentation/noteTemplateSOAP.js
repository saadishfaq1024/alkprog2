import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import ClientAvatar from "../Client/clientAvatarTest2";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
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

  root: {
    marginTop: theme.spacing(10)
  },
  letter: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(5)
  }
}));

const noteTypes = [
  {
    value: "Regular",
    label: "Regular"
  },
  {
    value: "Type 2",
    label: "Type 2"
  },
  {
    value: "Type 3",
    label: "Type 3"
  },
  {
    value: "Type 4",
    label: "Type 4"
  }
];

const attendanceTypes = [
  {
    value: "Present",
    label: "Present"
  },
  {
    value: "Absent",
    label: "Absent"
  },
  {
    value: "Late",
    label: "Late"
  }
];

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState({
    //name: '',
    //age: '',
    //multiline: 'Controlled',
    //currency: 'EUR',
    noteType: "Regular",
    attendanceType: "Present"
  });

  const [state, setState] = React.useState({
    checkedPayor: true,
    checkedFamily: true,
    checkedTherapist: true,
    checkedHIPAA: true,
    open: false
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeCheck = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Note Template Builder
          </Typography>
          <Button color="inherit" onClick={handleClose}>
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
    </div>
  );
}

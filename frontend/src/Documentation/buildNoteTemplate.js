import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import NoteAddIcon from "@material-ui/icons/NoteAddOutlined";
import ClientAvatar from "./clientAvatarTest2";

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
    marginRight: theme.spacing(1)
    //height: 400
  },
  checkBoxStyle: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    checkedHIPAA: true
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeCheck = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <IconButton>
        <NoteAddIcon
          color="primary"
          fontSize="large"
          onClick={handleClickOpen}
        />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
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
              Notes
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              Send
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container direction="row" justify="center" alignItems="center">
          <ClientAvatar />
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <TextField
            id="outlined-textbox"
            label="Name"
            defaultValue="John Smith"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-textbox"
            label="Date"
            defaultValue="4/1/2019"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <TextField
            id="outlined-select-currency"
            select
            label="Note Type"
            className={classes.textField2}
            value={values.noteType}
            onChange={handleChange("noteType")}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            margin="normal"
            variant="outlined"
          >
            {noteTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Attendance"
            className={classes.textField2}
            value={values.attendanceType}
            onChange={handleChange("attendanceType")}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            margin="normal"
            variant="outlined"
          >
            {attendanceTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <TextField
          id="standard-full-width"
          label="Notes"
          //style={{ margin: 8 }}
          className={classes.textField3}
          placeholder="Add notes here"
          fullWidth
          variant="outlined"
          multiline
          rows="15"
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                className={classes.checkBoxStyle}
                checked={state.checkedPayor}
                onChange={handleChangeCheck("checkedPayor")}
                value="checkedPayor"
                color="primary"
              />
            }
            label="Payor"
          />
          <FormControlLabel
            control={
              <Checkbox
                className={classes.checkBoxStyle}
                checked={state.checkedFamily}
                onChange={handleChangeCheck("checkedFamily")}
                value="checkedFamily"
                color="primary"
              />
            }
            label="Family"
          />
          <FormControlLabel
            control={
              <Checkbox
                className={classes.checkBoxStyle}
                checked={state.checkedTherapist}
                onChange={handleChangeCheck("checkedTherapist")}
                value="checkedTherapist"
                color="primary"
              />
            }
            label="Therapist"
          />
          <FormControlLabel
            control={
              <Checkbox
                className={classes.checkBoxStyle}
                checked={state.checkedHIPAA}
                onChange={handleChangeCheck("checkedHIPAA")}
                value="checkedHIPAA"
                color="primary"
              />
            }
            label="HIPAA"
          />
        </FormGroup>
      </Dialog>
    </div>
  );
}

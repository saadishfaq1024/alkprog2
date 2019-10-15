import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import moment from 'moment'

import MySnackbarContentWrapper from '../common/MySnackbarContentWrapper'

import API from '../utils/API'

const styles = theme => ({
  /* 
  clientAvatar: {
    margin: 10,
    color: theme.palette.getContrastText(Cyan[800]),
    backgroundColor: Cyan[800],
    width: 100,
    height: 100,
    fontSize: 40
    //marginBottom: theme.spacing(-18)
    //marginRight: theme.spacing(1) * 20
  }, */

  toggle: {
    paddingRight: theme.spacing(1) * 30
  },

  marg: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },

  menu: {
    width: 400
  },

  input: {
    display: 'none'
  },

  textField: {
    //marginLeft: theme.spacing(1),
    //marginRight: theme.spacing(1)
    //width: 400
  },

  textField2: {
    //marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    //marginTop: theme.spacing(2),
    width: 193
  },

  labelStyle: {
    marginTop: theme.spacing(5)
  },

  deleteButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText('#b2dfdb'),
    backgroundColor: '#b2dfdb',
    '&:hover': {
      backgroundColor: '#80cbc4'
    }
  },

  saveButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText('#b2dfdb'),
    backgroundColor: '#b2dfdb',
    '&:hover': {
      backgroundColor: '#80cbc4'
    }
  }
})

const theme = createMuiTheme({
  palette: {
    primary: { main: '#b2dfdb' }
  }
})

/* const theme2 = createMuiTheme({
  palette: {
    primary: { main: "#80cbc4" }
  }
}); */

const noteTypes = [
  {
    value: 'Regular',
    label: 'Regular'
  },
  {
    value: 'SOAP',
    label: 'SOAP'
  }
]

const attendanceTypes = [
  {
    value: 'Present',
    label: 'Present'
  },
  {
    value: 'Absent',
    label: 'Absent'
  },
  {
    value: 'Late',
    label: 'Late'
  }
]

class Documentation extends React.Component {
  state = {
    anchorEl: null,
    clientData: [],
    therapistData: [],
    client: 'John Smith',
    noteType: 'Regular',
    attendanceType: 'Present',
    sessionDate: '4/2/2019',
    regNote: '',
    s_note: '',
    o_note: '',
    a_note: '',
    p_note: '',
    calID: '',
    checkedPayor: true,
    checkedFamily: false,
    checkedTherapist: false,
    checkedPortal: false
  }

  componentDidMount() {
    this.setState({
      client: this.props.location.state.client,
      sessionDate: this.props.location.state.sessionDate,
      calID: this.props.location.state.eventId
    })
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked })
  }

  render() {
    const { classes } = this.props

    //test
    // const {clientData, therapistData } = this.state;

    return (
      <div>
        <Container maxWidth="lg">
          {/* Avatar */}
          {/*   <Grid container justify="center" alignItems="center">
            <IconButton color="primary" className={classes.clientAvatar}>
              {this.state.clientInitials}
            </IconButton>
          </Grid> */}
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <TextField
              id="client-textbox"
              label="Client"
              value={this.state.client}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="client-textbox"
              label="Calendar ID"
              value={this.state.calID}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="session-date"
              label="Session Date"
              value={moment(this.state.sessionDate).format('MM-DD-YYYY')}
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
            <MuiThemeProvider theme={theme}>
              <TextField
                id="note-type"
                select
                label="Note Type"
                className={classes.textField2}
                value={this.state.noteType}
                onChange={this.handleChange('noteType')}
                SelectProps={{
                  MenuProps: {
                    //className: classes.menu
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
            </MuiThemeProvider>

            <TextField
              id="attendance-type"
              select
              label="Attendance"
              className={classes.textField2}
              value={this.state.attendanceType}
              onChange={this.handleChange('attendanceType')}
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
          {/* Regular Note */}
          {this.state.noteType === 'Regular' ? (
            <TextField
              id="reg-note"
              label="Notes"
              //style={{ margin: 8 }}
              value={this.state.regNote}
              className={classes.textField3}
              placeholder="Add notes here"
              fullWidth
              onChange={this.handleChange('regNote')}
              variant="outlined"
              multiline
              rows="12"
              margin="normal"
              /*  InputLabelProps={{
              shrink: true
            }} */
            />
          ) : null}
          {/* SOAP Note */}
          {this.state.noteType === 'SOAP' ? (
            <Grid container direction="row">
              <Typography variant="h5" className={classes.letter}>
                S
              </Typography>
              <TextField
                id="s-note"
                //label="S"
                //style={{ margin: 8 }}
                // className={classes.textField3}
                //placeholder="Add notes here"
                value={this.state.s_note}
                fullWidth
                onChange={this.handleChange('s_note')}
                variant="outlined"
                multiline
                rows="2"
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Typography variant="h5" className={classes.letter}>
                O
              </Typography>
              <TextField
                id="o-note"
                //label="S"
                //style={{ margin: 8 }}
                // className={classes.textField3}
                //placeholder="Add notes here"
                value={this.state.o_note}
                onChange={this.handleChange('o_note')}
                fullWidth
                variant="outlined"
                multiline
                rows="2"
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Typography variant="h5" className={classes.letter}>
                A
              </Typography>
              <TextField
                id="a-note"
                //label="S"
                //style={{ margin: 8 }}
                // className={classes.textField3}
                //placeholder="Add notes here"
                value={this.state.a_note}
                onChange={this.handleChange('a_note')}
                fullWidth
                variant="outlined"
                multiline
                rows="2"
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Typography variant="h5" className={classes.letter}>
                P
              </Typography>
              <TextField
                id="p-note"
                //label="S"
                //style={{ margin: 8 }}
                // className={classes.textField3}
                //placeholder="Add notes here"
                value={this.state.p_note}
                onChange={this.handleChange('p_note')}
                fullWidth
                variant="outlined"
                multiline
                rows="2"
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
          ) : null}
          {/* Email options */}
          <FormLabel className={classes.labelStyle} component="legend">
            Email:
          </FormLabel>
          <MuiThemeProvider theme={theme}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkedPayor}
                    onChange={this.handleChangeCheck('checkedPayor')}
                    value="checkedPayor"
                    color="primary"
                  />
                }
                label="Payor"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkedFamily}
                    onChange={this.handleChangeCheck('checkedFamily')}
                    value="checkedFamily"
                    color="primary"
                  />
                }
                label="Family"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkedTherapist}
                    onChange={this.handleChangeCheck('checkedTherapist')}
                    value="checkedTherapist"
                    color="primary"
                  />
                }
                label="Therapist"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkedPortal}
                    onChange={this.handleChangeCheck('checkedPortal')}
                    value="checkedPortal"
                    color="primary"
                  />
                }
                label="Send to Portal"
              />
            </FormGroup>
          </MuiThemeProvider>
          <Grid container direction="row" justify="flex-end">
            <Button
              className={classes.saveButton}
              size="large"
              variant="contained"
              onClick={() => {
                this.onSubmit(
                  this.state.client,
                  this.state.noteType,
                  this.state.noteType,
                  this.state.attendanceType,
                  this.state.sessionDate,
                  this.state.regNote,
                  this.state.s_note,
                  this.state.o_note,
                  this.state.a_note,
                  this.state.p_note,
                  this.state.checkedPayor,
                  this.state.checkedFamily,
                  this.state.checkedTherapist,
                  this.state.checkedPortal
                )
              }}
            >
              Save and Send
            </Button>
          </Grid>
        </Container>
      </div>
    )
  }
}

Documentation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Documentation))

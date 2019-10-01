import React, { Component } from 'react'
import { withRouter } from 'react-router'

//import BigCalendar from "react-big-calendar";
import Calendar from 'react-big-calendar'
import moment from 'moment'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import NoteAddIcon from '@material-ui/icons/NoteAddOutlined'
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import MomentUtils from '@date-io/moment'
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from '@material-ui/pickers'
import Container from '@material-ui/core/Container'

import { Redirect, Link } from 'react-router-dom'

import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
// Snackbar
import Snackbar from '@material-ui/core/Snackbar'
import MySnackbarContentWrapper from '../common/MySnackbarContentWrapper'

import API from '../utils/API'

const localizer = Calendar.momentLocalizer(moment)
const propTypes = {}
moment().toDate()

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(10),
    height: '100%'
    // width: "90%"
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  textField2: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 194
  },
  dense: {
    marginTop: 16
  },
  menu: {
    //width: 200
  },
  root3: {
    width: '100%'
  }
})

const navStyle = {
  color: 'black',
  textDecoration: 'none'
}

const theme = createMuiTheme({
  palette: {
    primary: { main: '#b2dfdb' }
  }
})

const theme2 = createMuiTheme({
  palette: {
    primary: { main: '#00838f' }
  }
})

const newBillTypes = [
  {
    value: 'Billable',
    label: 'Billable'
  },

  {
    value: 'Non-billable',
    label: 'Non-billable'
  }
]

const repeatOptions = [
  {
    value: 'Daily',
    label: 'Daily'
  },

  {
    value: 'Weekly',
    label: 'Weekly'
  },
  {
    value: 'Monthly',
    label: 'Monthly'
  },
  {
    value: 'Custom',
    label: 'Custom'
  }
]

const repeatEndOptions = [
  /* {
    value: "Never",
    label: "Never"
  },
*/
  {
    value: 'After',
    label: 'After'
  },
  {
    value: 'On Date',
    label: 'On Date'
  }
]

const customFreqOptions = [
  {
    value: 'Specific Days',
    label: 'Specific Days'
  },

  {
    value: 'Every x days',
    label: 'Every x days'
  }
  /*
  {
    value: "Weekly",
    label: "Weekly"
  },
  {
    value: "Monthly",
    label: "Monthly"
  }
  */
]

const categories = [
  {
    value: 'None',
    label: 'None'
  }
]

class ReactCalendarBase extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      eventId: 0,
      deleteDialog: false,
      deleteSuccessSnackbarOpen: false,
      deleteFailureSnackbarOpen: false,
      cal_events: [
        //State is updated via componentDidMount
      ],
      therapistData: [],
      clientData: [],
      data: [],
      open: false,
      openExisting: false,
      //id: 0,
      // NEW EVENT
      newBillType: '',
      //newClientType: "",
      newClient: '',
      newTherapist: '',
      newLocation: '',
      newCategory: '',
      newStartDate: '',
      newStartTime: '',
      newEndDate: '',
      newEndTime: '',
      information: '',
      intervalIsSet: '',
      checkedRepeat: false,
      repeatOption: null,
      newEndRepeat: null,
      newNumOccurences: null,
      selectedDateOccurenceEnd: null,
      existingCustomFreq: null,
      sun: false,
      mon: false,
      tues: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      newRepeatEveryNumDays: null,
      newRepeatEveryNumWeeks: null,
      newRepeatEveryNumMonths: null,
      selectedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      endSelectedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      redirect: false,
      // EXISTING EVENT
      redirectDocs: false,
      attendance: 'Present',
      existingBillType: 'Billable',
      existingClientType: 'Individual',
      existingClient: 'John Smith',
      existingTherapist: 'Harry Potter',
      existingLocation: 'Main Building',
      existingCategory: 'None',
      existingStart: '',
      existingEnd: '',
      existingRepeat: 'Weekly',
      existingEndRepeat: 'On Date',
      existingNumOccurences: '',
      existingEveryNumDays: '',
      existingEveryNumWeeks: '',
      existingNumMonths: '',
      existingCheckedRepeat: true
    }
  }

  convertDate = date => {
    return moment.utc(date).toDate()
  }

  async componentDidMount() {
    await this.updateContent()
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {}

  onSubmit(e) {
    //experiment keeping preventDefault
    //e.preventDefault();

    const obj = {
      newBillType: this.state.newBillType,
      //newClientType: this.state.newClientType,
      newTherapist: this.state.newTherapist,
      newLocation: this.state.newLocation,
      newCategory: this.state.newCategory,
      newClient: this.state.newClient,
      selectedDate: this.state.selectedDate,
      endSelectedDate: this.state.endSelectedDate,
      checkedRepeat: this.state.checkedRepeat, //true,false
      repeatOption: this.state.repeatOption, //"Daily","Weekly","Monthly","Custom"
      newEndRepeat: this.state.newEndRepeat, //"After","On Date"
      existingNumOccurences: this.state.existingNumOccurences, //"4"
      selectedDateOccurenceEnd: this.state.selectedDateOccurenceEnd, //"2019-09-18 03:41:00"
      newCustomFreq: this.state.newCustomFreq, //"Specific Days","Every x days","Weekly","Montly"
      newRepeatEveryNumDays: this.state.newRepeatEveryNumDays,
      newRepeatEveryNumWeeks: this.state.newRepeatEveryNumWeeks,
      newRepeatEveryNumMonths: this.state.newRepeatEveryNumMonths,
      sun: this.state.sun,
      mon: this.state.mon,
      tues: this.state.tues,
      wed: this.state.wed,
      thu: this.state.thu,
      fri: this.state.fri,
      sat: this.state.sat
    }
    console.log('submitobj', obj)

    //Here I have just added some basic validation messages for fields that are needed for repeat appointments
    //I guess you will add validations in your form later on
    if (obj.checkedRepeat) {
      if (!obj.repeatOption) {
        alert('Please select "Repeat Option"')
      } else if (!obj.newEndRepeat) {
        alert('Please select "End Repeat"')
      } else if (obj.newEndRepeat === 'After' && !obj.existingNumOccurences) {
        alert('Please enter "Occurances"')
      } else if (
        obj.newEndRepeat === 'On Date' &&
        !obj.selectedDateOccurenceEnd
      ) {
        alert('Please select "End On"')
      } else if (obj.repeatOption === 'Custom' && !obj.newCustomFreq) {
        alert('Please select "Custom Frequency"')
      } else {
        API.post('/event/insert', obj)
          // .then(res => console.log(res.data));
          .then(response => {
            this.setState({
              obj,
              open: false,
              redirect: true
            })
          })
      }
    } else {
      API.post('/event/insert', obj).then(response => {
        this.setState({
          obj,
          open: false,
          redirect: true
        })
      })
      //.then(res => console.log(res.data));
    }
    /* this will clear everything after saving+closing */

    this.setState({
      newBillType: '',
      //newClientType: "",
      newClient: '',
      newTherapist: '',
      newLocation: '',
      newCategory: '',
      selectedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      endSelectedDate: moment()
        // .add(2, "days")
        .format('YYYY-MM-DD HH:mm:ss'),
      checkedRepeat: false,
      repeatOption: '',
      newEndRepeat: '',
      existingNumOccurences: '',
      selectedDateOccurenceEnd: moment().format('YYYY-MM-DD HH:mm:ss'),
      newCustomFreq: '',
      newRepeatEveryNumDays: '',
      newRepeatEveryNumWeeks: '',
      newRepeatEveryNumMonths: '',
      sun: false,
      mon: false,
      tues: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false
      // redirect: true,
      // open: false
    })
  }

  async updateContent() {
    try {
      const eventsResp = await API.get('/events')
      const therapistsResp = await API.get('/members/getTherapists')
      const clientsResp = await API.get('/clients/all')
      const cal_events =
        eventsResp.data.data.map(event => {
          const { title, start, end, ...resource } = event
          return {
            title,
            start,
            end,
            resource
          }
        }) || []
      const therapistData = therapistsResp.data.data || []
      const clientData = clientsResp.data.data || []

      this.setState(
        {
          cal_events,
          therapistData,
          clientData
        },
        () => {
          // this.changeContentWithClientId()
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  handleDeleteDialogOpen = () => {
    this.setState({ deleteDialog: true })
  }

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialog: false })
  }

  handleDelete = () => {
    API.delete(`/events/${this.state.eventId}`)
      .then(resp => {
        this.handleCloseExisting()
        this.setState(state => ({
          cal_events: state.cal_events.filter(
            event => event.resource.id !== this.state.eventId
          )
        }))
      })
      .catch(error => {
        console.log('ee', error)
        this.setState({
          deleteFailureSnackbarOpen: true,
          deleteClientErrorMsg: error
        })
      })
    this.handleDeleteDialogClose()
  }

  handleSnackbarClose = () => {
    this.setState({ deleteFailureSnackbarOpen: false })
  }

  /* show new event dialog box */
  handleClickOpen = () => {
    this.setState({
      open: true
    })
  }

  /* close new event dialog box */
  handleClose = () => {
    this.setState({
      open: false,
      //this will set the values to blank once the window is closed
      newBillType: '',
      newClientType: '',
      title: '',
      newClient: '',
      newTherapist: '',
      newLocation: '',
      newCategory: '',
      checkedRepeat: false,
      repeatOption: null,
      newEndRepeat: null,
      newNumOccurences: null,
      selectedDateOccurenceEnd: null,
      existingCustomFreq: null,
      sun: false,
      mon: false,
      tues: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      newRepeatEveryNumDays: null,
      newRepeatEveryNumWeeks: null,
      newRepeatEveryNumMonths: null,
      newCustomFreq: null,
      selectedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      endSelectedDate: moment()
        .add(1, 'hour')
        .format('YYYY-MM-DD HH:mm:ss')
    })
  }

  /* show existing event dialog box */
  handleClickOpen2 = event => {
    const {
      id,
      bill_type,
      client,
      therapist,
      location,
      category
    } = event.resource
    this.setState({
      openExisting: true,
      eventId: id,
      existingBillType: bill_type,
      existingClient: client,
      existingTherapist: therapist,
      existingLocation: location,
      existingCategory: category,
      existingStart: event.start,
      existingEnd: event.end
    })
  }

  /* close existing event dialog box */
  handleCloseExisting = () => {
    this.setState({ openExisting: false })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      newCustomFreq: null,
      sun: false,
      mon: false,
      tues: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false
    })
  }

  handleChange2 = name => event => {
    this.setState({
      [name]: event.target.value
      /* newCustomFreq: null,
      sun: false,
      mon: false,
      tues: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false */
    })
  }

  handleChangeCustom = name => event => {
    this.setState({
      [name]: event.target.value,
      sun: false,
      mon: false,
      tues: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false
    })
  }

  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked })
  }

  handleChangeCheck2 = name => event => {
    this.setState({
      [name]: event.target.checked,
      //this will set the values to blank once the window is closed
      repeatOption: null,
      newEndRepeat: null,
      newNumOccurences: null,
      selectedDateOccurenceEnd: null,
      existingCustomFreq: null,
      sun: false,
      mon: false,
      tues: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      newRepeatEveryNumDays: null,
      newRepeatEveryNumWeeks: null,
      newRepeatEveryNumMonths: null
      // contact 3,
      /* checkedContact3: false,
      contactFirstName3: null,
      contactLastName3: null,
      contactEmail3: null,
      contactTitle3: null,
      contactPhone3: null,
      contactAddress3: null,
      contactCity3: null,
      contactState3: null,
      contactZip3: null */
    })
  }

  //printState = () => console.log(this.state)

  handleDateChangeStart = date => {
    this.setState({ selectedDate: date.format('YYYY-MM-DD HH:mm:ss') })
  }

  handleDateChangeEnd = date => {
    this.setState({ endSelectedDate: date.format('YYYY-MM-DD HH:mm:ss') })
  }

  handleDateOccurenceChange = date => {
    this.setState({
      selectedDateOccurenceEnd: date.format('YYYY-MM-DD HH:mm:ss')
    })
  }

  handleRedirectDocs = () => {
    this.setState({ redirectDocs: true })
  }

  /*
  reloadPage() {
    window.location.reload();
  }
  */

  /*
  someMethod() {
    // Force a render without state change...
    this.forceUpdate();
  }
  */

  render() {
    const { classes } = this.props
    //const classes = withStyles();
    const {
      cal_events,
      therapistData,
      clientData,
      selectedDate,
      endSelectedDate
    } = this.state
    /*
    if (this.state.redirect) {
      return <Redirect to="/calendar/a" />;
    }
    */

    return (
      <div>
        <Container style={{ height: 1000 }} maxWidth="lg">
          <Calendar
            className={classes.root}
            selectable
            startAccessor={cal_events => new Date(cal_events.start)}
            endAccessor={cal_events => new Date(cal_events.end)}
            localizer={localizer}
            events={cal_events}
            views={['month', 'week', 'day']}
            defaultDate={new Date()}
            defaultView="month"
            onSelectEvent={this.handleClickOpen2}
            onSelectSlot={this.handleClickOpen}
            // (this sets the start time of 8am)
            min={new Date(2000, 1, 1, 8)}
            // this sets the end time of 8pm)
            max={new Date(2000, 1, 1, 20)}
          />
        </Container>
        {this.state.redirect ? <Redirect push to="/calendar/n" /> : null}

        {/* existing dialog */}
        <Dialog
          open={this.state.openExisting}
          onClose={this.handleCloseExisting}
        >
          <form className={classes.container} noValidate autoComplete="off">
            <DialogContent>
              <IconButton onClick={this.handleRedirectDocs}>
                <NoteAddIcon color="primary" fontSize="large" />
              </IconButton>
              <TextField
                required
                id="bill_type"
                select
                label="Bill Type"
                className={classes.textField}
                value={this.state.existingBillType}
                onChange={e =>
                  this.setState({ existingBillType: e.target.value })
                }
                margin="normal"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {newBillTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                id="existingClient"
                select
                label="Client"
                className={classes.textField}
                value={this.state.existingClient}
                onChange={this.handleChange('existingClient')}
                margin="normal"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {clientData.map(option => (
                  <MenuItem key={option.id} value={option.client_full_name}>
                    {option.client_full_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="existingTherapist"
                select
                label="Therapist"
                variant="outlined"
                margin="normal"
                className={classes.textField}
                value={this.state.existingTherapist}
                onChange={this.handleChange('existingTherapist')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {therapistData.map((option, i) => (
                  <MenuItem key={i} value={option.member_full_name}>
                    {option.member_full_name}
                  </MenuItem>
                ))}
              </TextField>
              <MuiThemeProvider theme={theme}>
                <TextField
                  required
                  id="existingLocation"
                  label="Location"
                  className={classes.textField2}
                  value={this.state.existingLocation}
                  onChange={e =>
                    this.setState({ existingLocation: e.target.value })
                  }
                  margin="normal"
                  variant="outlined"
                />
              </MuiThemeProvider>
              <TextField
                required
                id="existingCategory"
                select
                label="Category"
                className={classes.textField2}
                value={this.state.existingCategory}
                onChange={e =>
                  this.setState({ existingCategory: e.target.value })
                }
                margin="normal"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {categories.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <Grid container>
                    <MuiThemeProvider theme={theme2}>
                      <DatePicker
                        inputVariant="outlined"
                        margin="normal"
                        className={classes.textField2}
                        label="Date picker"
                        value={this.state.existingStart}
                        onChange={date =>
                          this.setState({ existingStart: date })
                        }
                      />

                      <TimePicker
                        margin="normal"
                        inputVariant="outlined"
                        className={classes.textField2}
                        label="Time picker"
                        value={this.state.existingStart}
                        onChange={date =>
                          this.setState({ existingStart: date })
                        }
                      />
                    </MuiThemeProvider>
                  </Grid>
                </MuiPickersUtilsProvider>
              </MuiThemeProvider>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container>
                  <MuiThemeProvider theme={theme2}>
                    <DatePicker
                      margin="normal"
                      inputVariant="outlined"
                      label="Date picker"
                      className={classes.textField2}
                      value={this.state.existingEnd}
                      onChange={date => this.setState({ existingStart: date })}
                    />
                    <TimePicker
                      inputVariant="outlined"
                      margin="normal"
                      label="Time picker"
                      className={classes.textField2}
                      value={this.state.existingEnd}
                      onChange={date => this.setState({ existingStart: date })}
                    />
                  </MuiThemeProvider>
                </Grid>
              </MuiPickersUtilsProvider>
              <Container>
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.checkedRepeat}
                          onChange={this.handleChangeCheck2('checkedRepeat')}
                          value="checkedRepeat"
                          color="primary"
                        />
                      }
                      label="Repeat"
                    />
                  </FormGroup>
                </MuiThemeProvider>
              </Container>
              {this.state.checkedRepeat ? (
                <TextField
                  id="standard-select-repeatOption"
                  select
                  label="Repeats"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.repeatOption}
                  onChange={this.handleChange('repeatOption')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {repeatOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              {this.state.repeatOption === 'Custom' ? (
                <TextField
                  id="standard-select-client"
                  select
                  label="Custom Frequency"
                  variant="outlined"
                  margin="normal"
                  className={classes.textField}
                  value={this.state.newCustomFreq}
                  onChange={this.handleChangeCustom('newCustomFreq')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {customFreqOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              {this.state.newCustomFreq === 'Specific Days' ? (
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormLabel component="legend">Every</FormLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.sun}
                          onChange={this.handleChangeCheck('sun')}
                          value="sun"
                          color="primary"
                        />
                      }
                      label="Su"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.mon}
                          onChange={this.handleChangeCheck('mon')}
                          value="mon"
                          color="primary"
                        />
                      }
                      label="M"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.tues}
                          onChange={this.handleChangeCheck('tues')}
                          value="tues"
                          color="primary"
                        />
                      }
                      label="T"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.wed}
                          onChange={this.handleChangeCheck('wed')}
                          value="wed"
                          color="primary"
                        />
                      }
                      label="W"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.thu}
                          onChange={this.handleChangeCheck('thu')}
                          value="thu"
                          color="primary"
                        />
                      }
                      label="Th"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.fri}
                          onChange={this.handleChangeCheck('fri')}
                          value="fri"
                          color="primary"
                        />
                      }
                      label="F"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.sat}
                          onChange={this.handleChangeCheck('sat')}
                          value="sat"
                          color="primary"
                        />
                      }
                      label="Sa"
                    />
                  </FormGroup>
                </MuiThemeProvider>
              ) : null}

              {this.state.newCustomFreq === 'Every x days' ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Every Number of Days"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.newRepeatEveryNumDays}
                  onChange={this.handleChangeCustom('newRepeatEveryNumDays')}
                  margin="normal"
                />
              ) : null}

              {this.state.existingCustomFreq === 'Weekly' ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Every Number of Weeks"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.newRepeatEveryNumWeeks}
                  onChange={this.handleChangeCustom('newRepeatEveryNumWeeks')}
                  margin="normal"
                />
              ) : null}

              {this.state.existingCustomFreq === 'Monthly' ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Every Number of Months"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.newRepeatEveryNumMonths}
                  onChange={this.handleChangeCustom('newRepeatEveryNumMonths')}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedRepeat ? (
                <TextField
                  id="standard-select-client"
                  select
                  label="End Repeat"
                  variant="outlined"
                  margin="normal"
                  className={classes.textField2}
                  value={this.state.newEndRepeat}
                  onChange={this.handleChange2('newEndRepeat')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {repeatEndOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              {this.state.newEndRepeat === 'After' ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Occurences"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.newNumOccurences}
                  onChange={this.handleChange2('existingNumOccurences')}
                  margin="normal"
                />
              ) : null}

              {this.state.newEndRepeat === 'On Date' ? (
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <MuiThemeProvider theme={theme2}>
                    <DatePicker
                      inputVariant="outlined"
                      className={classes.textField2}
                      margin="normal"
                      id="mui-pickers-date"
                      label="End On"
                      value={this.state.selectedDateOccurenceEnd}
                      onChange={this.handleDateOccurenceChange}
                    />
                  </MuiThemeProvider>
                </MuiPickersUtilsProvider>
              ) : null}
              <IconButton onClick={this.handleDeleteDialogOpen}>
                <DeleteForeverIcon color="secondary" fontSize="large" />
              </IconButton>
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={this.state.deleteFailureSnackbarOpen}
                onClose={this.handleSnackbarClose}
                autoHideDuration={3000}
              >
                <MySnackbarContentWrapper
                  variant="error"
                  className={classes.margin}
                  message={`Something went wrong while removing client: ${this.state.deleteClientErrorMsg}`}
                />
              </Snackbar>
              <Dialog
                open={this.state.deleteDialog}
                onClose={this.handleDeleteDialogClose}
              >
                <DialogTitle>
                  Are you sure you want to delete this appointment?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Once this appointment has been deleted, it cannot be undone.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleDeleteDialogClose}>No</Button>
                  <Button onClick={this.handleDelete} autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </DialogContent>
            <Grid container justify="flex-end" alignItems="flex-end">
              <MuiThemeProvider theme={theme2}>
                <DialogActions>
                  <Button onClick={this.handleCloseExisting} color="primary">
                    Cancel
                  </Button>

                  <Button color="primary">Save</Button>
                </DialogActions>
              </MuiThemeProvider>
            </Grid>
          </form>
        </Dialog>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <form className={classes.container} noValidate autoComplete="off">
            <DialogContent>
              <TextField
                required
                id="bill_type"
                select
                label="Bill Type"
                className={classes.textField}
                value={this.state.newBillType}
                onChange={e => this.setState({ newBillType: e.target.value })}
                margin="normal"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {newBillTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                id="newClient"
                select
                label="Client"
                className={classes.textField}
                value={this.state.newClient}
                onChange={this.handleChange('newClient')}
                margin="normal"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {clientData.map(option => (
                  <MenuItem key={option.id} value={option.client_full_name}>
                    {option.client_full_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-therapist"
                select
                label="Therapist"
                variant="outlined"
                margin="normal"
                className={classes.textField}
                value={this.state.newTherapist}
                onChange={this.handleChange('newTherapist')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {therapistData.map(option => (
                  <MenuItem key={option.id} value={option.member_full_name}>
                    {option.member_full_name}
                  </MenuItem>
                ))}
              </TextField>
              <MuiThemeProvider theme={theme}>
                <TextField
                  required
                  id="newLocation"
                  label="Location"
                  className={classes.textField2}
                  value={this.state.newLocation}
                  onChange={e => this.setState({ newLocation: e.target.value })}
                  margin="normal"
                  variant="outlined"
                />
              </MuiThemeProvider>
              <TextField
                required
                id="newCategory"
                select
                label="Category"
                className={classes.textField2}
                value={this.state.newCategory}
                onChange={e => this.setState({ newCategory: e.target.value })}
                margin="normal"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {categories.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <Grid container row>
                    <MuiThemeProvider theme={theme2}>
                      <DatePicker
                        inputVariant="outlined"
                        margin="normal"
                        className={classes.textField2}
                        label="Date picker"
                        value={selectedDate}
                        onChange={this.handleDateChangeStart}
                      />

                      <TimePicker
                        margin="normal"
                        inputVariant="outlined"
                        className={classes.textField2}
                        label="Time picker"
                        value={selectedDate}
                        onChange={this.handleDateChangeStart}
                      />
                    </MuiThemeProvider>
                  </Grid>
                </MuiPickersUtilsProvider>
              </MuiThemeProvider>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container row>
                  <MuiThemeProvider theme={theme2}>
                    <DatePicker
                      margin="normal"
                      inputVariant="outlined"
                      label="Date picker"
                      className={classes.textField2}
                      value={endSelectedDate}
                      onChange={this.handleDateChangeEnd}
                    />
                    <TimePicker
                      inputVariant="outlined"
                      margin="normal"
                      label="Time picker"
                      className={classes.textField2}
                      value={endSelectedDate}
                      onChange={this.handleDateChangeEnd}
                    />
                  </MuiThemeProvider>
                </Grid>
              </MuiPickersUtilsProvider>
              <Container>
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.checkedRepeat}
                          onChange={this.handleChangeCheck2('checkedRepeat')}
                          value="checkedRepeat"
                          color="primary"
                        />
                      }
                      label="Repeat"
                    />
                  </FormGroup>
                </MuiThemeProvider>
              </Container>
              {this.state.checkedRepeat ? (
                <TextField
                  id="standard-select-repeatOption"
                  select
                  label="Repeats"
                  variant="outlined"
                  className={classes.textField}
                  value={this.state.repeatOption}
                  onChange={this.handleChange('repeatOption')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {repeatOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              {this.state.repeatOption === 'Custom' ? (
                <TextField
                  id="standard-select-client"
                  select
                  label="Custom Frequency"
                  variant="outlined"
                  margin="normal"
                  className={classes.textField}
                  value={this.state.newCustomFreq}
                  onChange={this.handleChangeCustom('newCustomFreq')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {customFreqOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              {this.state.newCustomFreq === 'Specific Days' ? (
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormLabel component="legend">Every</FormLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.sun}
                          onChange={this.handleChangeCheck('sun')}
                          value="sun"
                          color="primary"
                        />
                      }
                      label="Su"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.mon}
                          onChange={this.handleChangeCheck('mon')}
                          value="mon"
                          color="primary"
                        />
                      }
                      label="M"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.tues}
                          onChange={this.handleChangeCheck('tues')}
                          value="tues"
                          color="primary"
                        />
                      }
                      label="T"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.wed}
                          onChange={this.handleChangeCheck('wed')}
                          value="wed"
                          color="primary"
                        />
                      }
                      label="W"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.thu}
                          onChange={this.handleChangeCheck('thu')}
                          value="thu"
                          color="primary"
                        />
                      }
                      label="Th"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.fri}
                          onChange={this.handleChangeCheck('fri')}
                          value="fri"
                          color="primary"
                        />
                      }
                      label="F"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.sat}
                          onChange={this.handleChangeCheck('sat')}
                          value="sat"
                          color="primary"
                        />
                      }
                      label="Sa"
                    />
                  </FormGroup>
                </MuiThemeProvider>
              ) : null}

              {this.state.newCustomFreq === 'Every x days' ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Every Number of Days"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.newRepeatEveryNumDays}
                  onChange={this.handleChangeCustom('newRepeatEveryNumDays')}
                  margin="normal"
                />
              ) : null}

              {this.state.existingCustomFreq === 'Weekly' ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Every Number of Weeks"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.newRepeatEveryNumWeeks}
                  onChange={this.handleChangeCustom('newRepeatEveryNumWeeks')}
                  margin="normal"
                />
              ) : null}

              {this.state.existingCustomFreq === 'Monthly' ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Every Number of Months"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.newRepeatEveryNumMonths}
                  onChange={this.handleChangeCustom('newRepeatEveryNumMonths')}
                  margin="normal"
                />
              ) : null}

              {this.state.checkedRepeat ? (
                <TextField
                  id="standard-select-client"
                  select
                  label="End Repeat"
                  variant="outlined"
                  margin="normal"
                  className={classes.textField2}
                  value={this.state.newEndRepeat}
                  onChange={this.handleChange2('newEndRepeat')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {repeatEndOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              {this.state.newEndRepeat === 'After' ? (
                <TextField
                  id="standard-newNumOccurences"
                  label="Occurences"
                  variant="outlined"
                  className={classes.textField2}
                  value={this.state.newNumOccurences}
                  onChange={this.handleChange2('existingNumOccurences')}
                  margin="normal"
                />
              ) : null}

              {this.state.newEndRepeat === 'On Date' ? (
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <MuiThemeProvider theme={theme2}>
                    <DatePicker
                      inputVariant="outlined"
                      className={classes.textField2}
                      margin="normal"
                      id="mui-pickers-date"
                      label="End On"
                      value={this.state.selectedDateOccurenceEnd}
                      onChange={this.handleDateOccurenceChange}
                    />
                  </MuiThemeProvider>
                </MuiPickersUtilsProvider>
              ) : null}
            </DialogContent>
            <Grid container justify="flex-end" alignItems="flex-end">
              <MuiThemeProvider theme={theme2}>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>

                  <Button
                    onClick={() => {
                      this.onSubmit(
                        //this.state.title,
                        this.state.newBillType,
                        //this.state.newClientType,
                        this.state.newClient,
                        this.state.thereapist,
                        this.state.newLocation,
                        this.state.newCategory,
                        this.state.selectedDate,
                        this.state.endSelectedDate
                        /* any other notable recurring ones will eventually be submitted */
                      )
                      //this.reloadPage();
                    }}
                    color="primary"
                  >
                    Save
                  </Button>

                  {/*
              <Button onClick={this.printState} color="primary">
                Print State
              </Button>
              */}
                </DialogActions>
              </MuiThemeProvider>
            </Grid>
          </form>
        </Dialog>
      </div>
    )
  }
}

ReactCalendarBase.propTypes = propTypes

export default withRouter(withStyles(styles)(ReactCalendarBase))

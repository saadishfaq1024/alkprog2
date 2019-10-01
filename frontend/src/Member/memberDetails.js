import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import deepPurple from '@material-ui/core/colors/deepPurple'
import Grid from '@material-ui/core/Grid'
import green from '@material-ui/core/colors/green'

import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Switch from '@material-ui/core/Switch'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import AssignedClientsTable from '../Tables/backEndAssignedClientsTable'
import TeamMemFilesTable from '../Tables/teamMemFilesTable'
import MemberUploadAction from '../Actions/memberUploadAction'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Blue from '@material-ui/core/colors/blue'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import classNames from 'classnames'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/Warning'
import InfoIcon from '@material-ui/icons/Info'

import API from '../utils/API'

const styles = theme => ({
  root: {
    marginTop: theme.spacing(10),
    align: 'center',
    height: '130'
  },

  memberAvatar: {
    margin: 10,
    color: theme.palette.getContrastText(Blue[800]),
    backgroundColor: Blue[800],
    '&:hover': {
      backgroundColor: Blue[400]
    },
    width: 100,
    height: 100,
    fontSize: 40,
    marginBottom: theme.spacing(-18)
  },

  toggle: {
    paddingRight: theme.spacing(1) * 30
  },

  marg: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 300
  },

  textFieldTop: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(5),
    width: 300
  },
  menu: {
    width: 200
  },

  checked: {},

  root2: {
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: Blue[800]
  },
  infoRoot: {
    marginBottom: theme.spacing(1) * 2
  },

  assignRoot: {
    paddingTop: theme.spacing(1) * 2,
    paddingBottom: theme.spacing(1) * 2,
    marginTop: theme.spacing(1) * 5,
    //marginLeft: theme.spacing(1) * 33.5,
    // align: "center",
    width: '14.5%'
  },

  floatButton: {
    marginTop: theme.spacing(4),
    margin: theme.spacing(1),
    /* this is text color */ color: theme.palette.getContrastText('#b2dfdb'),
    backgroundColor: '#b2dfdb',
    '&:hover': {
      backgroundColor: '#80cbc4'
    }
  },

  margin: {
    margin: theme.spacing(1)
  },

  deleteButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText('#b2dfdb'),
    backgroundColor: '#b2dfdb',
    '&:hover': {
      backgroundColor: '#80cbc4'
    }
  },

  saveButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText('#b2dfdb'),
    backgroundColor: '#b2dfdb',
    '&:hover': {
      backgroundColor: '#80cbc4'
    }
  },

  leftIcon: {
    // marginRight: theme.spacing(1)
  },

  formRoot: {
    marginTop: theme.spacing(2)
    // marginLeft: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(3)
  }
})

const roles = [
  {
    value: 'Administrator',
    label: 'Administrator'
  },

  {
    value: 'Therapist',
    label: 'Therapist'
  },

  {
    value: 'Intern',
    label: 'Intern'
  }
]

const titles = [
  {
    value: '',
    label: ''
  },

  {
    value: 'Dr.',
    label: 'Dr.'
  },

  {
    value: 'Miss',
    label: 'Miss'
  },

  {
    value: 'Mr.',
    label: 'Mr.'
  },
  {
    value: 'Mrs.',
    label: 'Mrs.'
  },
  {
    value: 'Ms.',
    label: 'Ms.'
  },
  {
    value: 'Mx.',
    label: 'Mx.'
  }
]

const theme = createMuiTheme({
  palette: {
    primary: { main: '#b2dfdb' }
  }
})

const theme2 = createMuiTheme({
  palette: {
    primary: { main: '#80cbc4' }
  }
})

class MemberDetails extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    checkedA: true,
    member: 0, // current member id
    therapistData: [],
    clientData: [],
    open: false,
    cost: '',
    length: '',
    type: '',
    checkedAdmin: true,
    checkedThera: true,
    checkedIntern: false,
    tabValue: 0,
    deleteDialog: false,
    memberRole: 'Administrator',
    //client info
    fullName: '',
    firstName: 'Harry',
    lastName: 'Potter',
    email: 'harry@hogwarts.com',
    title: 'Mr.',
    currentPassword: 'test123',
    confirmPassword: 'test123',
    phone: '123-456-1111',
    address: '713 Hogwarts Lane',
    location: 'Diagon Alley',
    npi: '731890',
    city: 'London',
    bday: '7/31/92',
    state: 'TX',
    zipCode: '77777',
    multiline: 'Controlled',
    deleteDialog: false,
    // assigned clients
    client: '',
    assignOpen: false,
    // privliges
    invoice: false,
    allCalendar: false,
    payment: true,
    editOtherSched: false,
    viewOtherSched: false,
    editOtherInfo: false,
    viewOtherInfo: false,
    addClient: true,
    recordAttendance: true,
    viewNote: true,
    viewClient: false,
    kpis: true,
    viewReport: false,
    viewCalendar: true,
    viewOwnClient: true
  }

  async componentDidMount() {
    try {
      const membersResp = await API.get('/members')
      const clientsResp = await API.get('/clients/all')
      const members = membersResp.data.data
      const clients = clientsResp.data.data

      this.setState({
        therapistData: members,
        clientData: clients
      })
      this.setState({ member: this.props.location.state.curMemberId }, () => {
        this.changeContentWithMemberId()
      })
    } catch (error) {
      console.log('Data fetching error: ', error)
    }
  }

  handleDeleteDialogOpen = () => {
    this.setState({ deleteDialog: true })
  }

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialog: false });
  };

  handleChangeCheckedAdmin = name => event => {
    this.setState({
      [name]: event.target.checked,
      invoice: true,
      allCalendar: true,
      payment: true,
      editOtherSched: true,
      viewOtherSched: true,
      editOtherInfo: true,
      viewOtherInfo: true,
      addClient: true,
      recordAttendance: true,
      viewNote: true,
      viewClient: true,
      kpis: true,
      viewReport: true,
      viewCalendar: true,
      viewOwnClient: true
    })
  }

  handleChangeCheckedTherapist = name => event => {
    this.setState({
      [name]: event.target.checked,
      invoice: false,
      allCalendar: false,
      payment: true,
      editOtherSched: false,
      viewOtherSched: false,
      editOtherInfo: false,
      viewOtherInfo: false,
      addClient: true,
      recordAttendance: true,
      viewNote: true,
      viewClient: false,
      kpis: true,
      viewReport: false,
      viewCalendar: true,
      viewOwnClient: true
    })
  }

  handleChangeCheckedIntern = name => event => {
    this.setState({
      [name]: event.target.checked,
      invoice: false,
      allCalendar: false,
      payment: false,
      editOtherSched: false,
      viewOtherSched: false,
      editOtherInfo: false,
      viewOtherInfo: false,
      addClient: false,
      recordAttendance: false,
      viewNote: false,
      viewClient: false,
      kpis: false,
      viewReport: false,
      viewCalendar: true,
      viewOwnClient: true
    })
  }

  handleClickAvatar = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleCloseAvatar = () => {
    this.setState({ anchorEl: null })
  }

  /* change of team member dropdown */
  handleChangeValue = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      if (name === 'member') this.changeContentWithMemberId()
    })
  }

  changeContentWithMemberId() {
    const member = this.state.therapistData.find(
      ({ id }) => id === this.state.member
    )
    if (member) {
      const {
        id,
        title,
        member_full_name,
        member_first_name,
        member_last_name,
        email,
        phone,
        street_address,
        city,
        zip,
        location,
        bday,
        npi,
        pass,
        notes,
        role
      } = member
      this.setState({
        memberRole: role,
        fullName: member_full_name,
        firstName: member_first_name,
        lastName: member_last_name,
        email: email,
        title: title,
        currentPassword: pass,
        confirmPassword: pass,
        phone: phone,
        address: street_address,
        npi: npi,
        city: city,
        zipCode: zip
      })
    }
  }
  // change of check boxes
  handleChangeChecked = name => event => {
    this.setState({ [name]: event.target.checked })
  }

  handleChangeTab = (event, tabValue) => {
    this.setState({ tabValue })
  }

  //show client details box;
  handleClickClientOpen = () => {
    this.setState({ assignOpen: true })
  }

  handleClientClose = () => {
    this.setState({ assignOpen: false })
  }

  handleDeleteDialogOpen = () => {
    this.setState({ deleteDialog: true })
  }

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialog: false })
  }

  render() {
    const { classes } = this.props
    const { anchorEl, tabValue, clientData, therapistData } = this.state
    return (
      <div>
        <Container maxWidth="lg">
          {/* Avatar */}
          <Grid container justify="center" alignItems="center">
            <IconButton
              color="primary"
              className={classes.memberAvatar}
              onClick={this.handleClickAvatar}
            >
              HP
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={this.handleCloseAvatar}
            >
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                // multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <MenuItem onClick={this.handleClose}>Upload Picture </MenuItem>
              </label>
              <MenuItem onClick={this.handleClose}>Remove Picture</MenuItem>
            </Menu>
          </Grid>
          <Paper className={classes.root} elevation={2}>
            <MuiThemeProvider theme={theme}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.checkedA}
                      onChange={this.handleChangeChecked('checkedA')}
                      value="checkedA"
                      margin="theme.spacing(1) * 20"
                      className={classes.marg}
                      color="primary"
                    />
                  }
                  label="Active"
                />
              </FormGroup>
            </MuiThemeProvider>
            {/* member drop down */}
            <Grid container justify="space-between">
              <TextField
                id="standard-select-member"
                select
                label="Team Member"
                variant="outlined"
                className={classes.textField}
                value={this.state.member}
                onChange={this.handleChangeValue('member')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {therapistData.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.member_full_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="memberRole"
                select
                label="Role"
                variant="outlined"
                className={classes.textField}
                value={this.state.memberRole}
                onChange={this.handleChangeValue('memberRole')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {roles.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Paper>

          <AppBar className={classes.root2} position="static">
            {/* <MuiThemeProvider theme={theme}> */}
            <Tabs
              indicatorColor="primary"
              value={tabValue}
              onChange={this.handleChangeTab}
            >
              <Tab label="Team Member Information" />
              <Tab label="Assigned Clients" />
              <Tab label="Message History" />
              <Tab label="Member Files" />
              <Tab label="Privileges " />
            </Tabs>
            {/* </MuiThemeProvider> */}
          </AppBar>

          {tabValue === 0 && (
            <form
              /* className={classes.container} */ noValidate
              autoComplete="off"
            >
              <Paper className={classes.infoRoot} elevation={2}>
                <Grid container justify="center" alignItems="center">
                  <TextField
                    id="standard-select-title"
                    select
                    margin="normal"
                    label="Title"
                    variant="outlined"
                    className={classes.textFieldTop}
                    value={this.state.title}
                    onChange={this.handleChangeValue('title')}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {titles.map((option, i) => (
                      <MenuItem key={i} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      required
                      id="standard-firstName"
                      label="First Name"
                      variant="outlined"
                      className={classes.textFieldTop}
                      value={this.state.firstName}
                      onChange={this.handleChangeValue('firstName')}
                      margin="normal"
                    />
                  </MuiThemeProvider>

                  <TextField
                    required
                    id="standard-lastNamename"
                    label="Last Name"
                    variant="outlined"
                    className={classes.textFieldTop}
                    value={this.state.lastName}
                    onChange={this.handleChangeValue('lastName')}
                    margin="normal"
                  />

                  <TextField
                    required
                    id="standard-email"
                    variant="outlined"
                    label="Email"
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChangeValue('email')}
                    margin="normal"
                  />

                  <TextField
                    required
                    id="standard-password-input"
                    variant="outlined"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    value={this.state.currentPassword}
                    onChange={this.handleChangeValue('currentPassword')}
                    //autoComplete="current-password"
                    margin="normal"
                  />

                  <TextField
                    required
                    id="standard-confirmPassword-input"
                    variant="outlined"
                    label="Confirm Password"
                    className={classes.textField}
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={this.handleChangeValue('confirmPassword')}
                    //autoComplete="current-password"
                    margin="normal"
                  />

                  <TextField
                    id="standard-address"
                    variant="outlined"
                    label="Address"
                    className={classes.textField}
                    value={this.state.address}
                    onChange={this.handleChangeValue('address')}
                    margin="normal"
                  />

                  <TextField
                    id="standard-city-"
                    variant="outlined"
                    label="City"
                    className={classes.textField}
                    value={this.state.city}
                    onChange={this.handleChangeValue('city')}
                    margin="normal"
                  />

                  <TextField
                    id="standard-state"
                    variant="outlined"
                    label="State"
                    className={classes.textField}
                    value={this.state.state}
                    onChange={this.handleChangeValue('state')}
                    margin="normal"
                  />

                  <TextField
                    id="standard-zipCode"
                    variant="outlined"
                    label="Zip Code"
                    className={classes.textField}
                    value={this.state.zipCode}
                    onChange={this.handleChangeValue('zipCode')}
                    margin="normal"
                  />

                  <TextField
                    id="standard-phone"
                    variant="outlined"
                    label="Phone Number"
                    className={classes.textField}
                    value={this.state.phone}
                    onChange={this.handleChangeValue('phone')}
                    margin="normal"
                  />

                  <TextField
                    id="standard-bday"
                    variant="outlined"
                    label="Birthday"
                    className={classes.textField}
                    value={this.state.bday}
                    onChange={this.handleChangeValue('bday')}
                    margin="normal"
                  />

                  <TextField
                    id="standard-npi"
                    variant="outlined"
                    label="NPI Number"
                    className={classes.textField}
                    value={this.state.npi}
                    onChange={this.handleChangeValue('npi')}
                    margin="normal"
                  />

                  <TextField
                    id="standard-primary-location"
                    variant="outlined"
                    label="Primary Location"
                    className={classes.textField}
                    value={this.state.location}
                    onChange={this.handleChangeValue('location')}
                    margin="normal"
                  />

                  <MuiThemeProvider theme={theme2}>
                    <TextField
                      id="standard-full-width"
                      style={{ margin: 8 }}
                      className={classes.textField2}
                      placeholder="Add any additional notes here"
                      fullWidth
                      multiline
                      margin="normal"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </MuiThemeProvider>
                </Grid>
                <Grid container direction="row" justify="space-between">
                  <Button
                    className={classes.deleteButton}
                    size="large"
                    variant="contained"
                    onClick={this.handleDeleteDialogOpen}
                  >
                    Delete
                  </Button>
                  <Dialog
                    open={this.state.deleteDialog}
                    onClose={this.handleDeleteDialogClose}
                  >
                    <DialogTitle>
                      Are you sure you want to delete this member?
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Once this member has been deleted, it cannot be undone.
                        If this member has references elsewhere, this member
                        will be marked as inactive.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleDeleteDialogClose}>No</Button>
                      <Button onClick={this.handleDeleteDialogClose} autoFocus>
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Button
                    className={classes.saveButton}
                    onClick={this.handleSnackOpenSuccess}
                    size="large"
                    variant="contained"
                  >
                    Save
                  </Button>
                </Grid>
              </Paper>
            </form>
          )}
          {tabValue === 1 && (
            <Grid container justify="center" alignItems="center">
              {/* Assign client button */}
              <Button
                variant="contained"
                onClick={this.handleClickClientOpen}
                className={classes.floatButton}
              >
                <AddIcon />
                Assign Client
              </Button>
              <Dialog
                open={this.state.assignOpen}
                onClose={this.handleClientClose}
              >
                <DialogTitle id="form-dialog-title">Assign Client</DialogTitle>
                <DialogContent>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      id="standard-select-client"
                      select
                      label="Clients"
                      variant="outlined"
                      margin="normal"
                      className={classes.textField}
                      value={this.state.client}
                      onChange={this.handleChangeValue('client')}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                    >
                      {clientData.map(option => (
                        <MenuItem
                          key={option.id}
                          value={option.client_full_name}
                        >
                          {option.client_full_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </MuiThemeProvider>
                </DialogContent>
                <MuiThemeProvider theme={theme2}>
                  <DialogActions>
                    <Button onClick={this.handleClientClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleClientClose} color="primary">
                      Assign
                    </Button>
                  </DialogActions>
                </MuiThemeProvider>
              </Dialog>
            </Grid>
          )}
          {tabValue === 1 && (
            <AssignedClientsTable
              clients={this.state.clientData}
              therapistFullName={this.state.fullName}
            />
          )}
          {tabValue === 2 && <Paper>Message History</Paper>}
          {tabValue === 3 && <MemberUploadAction />}
          {tabValue === 3 && <TeamMemFilesTable />}
          {tabValue === 4 && (
            <Paper className={classes.infoRoot2} elevation={2}>
              {this.state.memberRole === 'Administrator' ? (
                <Grid
                  container
                  // direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <MuiThemeProvider theme={theme}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        {/* chunk 1-5 */}

                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              className={classes.formRoot2}
                              color="primary"
                              checked={this.state.invoice}
                              onChange={this.handleChangeChecked('invoice')}
                              value="invoice"
                            />
                          }
                          label="Invoices/Billing"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              color="primary"
                              checked={this.state.allCalendar}
                              onChange={this.handleChangeChecked('allCalendar')}
                              value="allCalendar"
                            />
                          }
                          label="Calendar of everyone"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              color="primary"
                              checked={this.state.viewClient}
                              onChange={this.handleChangeChecked('viewClient')}
                              value="viewClient"
                            />
                          }
                          label="View other clients vs. own clients"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              color="primary"
                              checked={this.state.editOtherSched}
                              onChange={this.handleChangeChecked(
                                'editOtherSched'
                              )}
                              value="editOtherSched"
                            />
                          }
                          label="Edit other therapist schedule"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              color="primary"
                              checked={this.state.viewOtherSched}
                              onChange={this.handleChangeChecked(
                                'viewOtherSched'
                              )}
                              value="viewOtherSched"
                            />
                          }
                          label="View other therapist schedule"
                        />
                        {/* chunk 6-10 */}
                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              color="primary"
                              checked={this.state.editOtherInfo}
                              onChange={this.handleChangeChecked(
                                'editOtherInfo'
                              )}
                              value="editOtherInfo"
                            />
                          }
                          label="Edit other therapist/client info"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              color="primary"
                              checked={this.state.viewOtherInfo}
                              onChange={this.handleChangeChecked(
                                'viewOtherInfo'
                              )}
                              value="viewOtherInfo"
                            />
                          }
                          label="View other therapist/client info"
                        />
                      </FormGroup>
                    </FormControl>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              checked={this.state.addClient}
                              onChange={this.handleChangeChecked('addClient')}
                              value="addClient"
                            />
                          }
                          label="Add client"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              checked={this.state.recordAttendance}
                              onChange={this.handleChangeChecked(
                                'recordAttendance'
                              )}
                              value="recordAttendance"
                            />
                          }
                          label="Record Attendance"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              checked={this.state.payment}
                              onChange={this.handleChangeChecked('payment')}
                              value="payment"
                            />
                          }
                          label="Take payment"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              checked={this.state.viewNote}
                              onChange={this.handleChangeChecked('viewNote')}
                              value="viewNote"
                            />
                          }
                          label="View note history"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              color="primary"
                              checked={this.state.viewReport}
                              onChange={this.handleChangeChecked('viewReport')}
                              value="jason"
                            />
                          }
                          label="View/create reports"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              checked={this.state.viewCalendar}
                              onChange={this.handleChangeChecked(
                                'viewCalendar'
                              )}
                              value="viewCalendar"
                            />
                          }
                          label="View own calendar"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              checked={this.state.viewOwnClient}
                              onChange={this.handleChangeChecked(
                                'viewOwnClient'
                              )}
                              value="viewOwnClient"
                            />
                          }
                          label="View own clients"
                        />
                      </FormGroup>
                    </FormControl>
                  </MuiThemeProvider>
                </Grid>
              ) : null}

              {this.state.memberRole === 'Therapist' ? (
                <Grid
                  container
                  // direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <MuiThemeProvider theme={theme}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        {/* chunk 1-5 */}

                        <FormControlLabel
                          control={
                            <Switch
                              className={classes.formRoot2}
                              color="primary"
                              checked={this.state.invoice}
                              onChange={this.handleChangeChecked('invoice')}
                              value="invoice"
                            />
                          }
                          label="Invoices/Billing"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.allCalendar}
                              onChange={this.handleChangeChecked('allCalendar')}
                              value="allCalendar"
                            />
                          }
                          label="Calendar of everyone"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.viewClient}
                              onChange={this.handleChangeChecked('viewClient')}
                              value="viewClient"
                            />
                          }
                          label="View other clients vs. own clients"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.editOtherSched}
                              onChange={this.handleChangeChecked(
                                'editOtherSched'
                              )}
                              value="editOtherSched"
                            />
                          }
                          label="Edit other therapist schedule"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.viewOtherSched}
                              onChange={this.handleChangeChecked(
                                'viewOtherSched'
                              )}
                              value="viewOtherSched"
                            />
                          }
                          label="View other therapist schedule"
                        />
                        {/* chunk 6-10 */}
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.editOtherInfo}
                              onChange={this.handleChangeChecked(
                                'editOtherInfo'
                              )}
                              value="editOtherInfo"
                            />
                          }
                          label="Edit other therapist/client info"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.viewOtherInfo}
                              onChange={this.handleChangeChecked(
                                'viewOtherInfo'
                              )}
                              value="viewOtherInfo"
                            />
                          }
                          label="View other therapist/client info"
                        />
                      </FormGroup>
                    </FormControl>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              checked={this.state.addClient}
                              onChange={this.handleChangeChecked('addClient')}
                              value="addClient"
                            />
                          }
                          label="Add client"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              checked={this.state.recordAttendance}
                              onChange={this.handleChangeChecked(
                                'recordAttendance'
                              )}
                              value="recordAttendance"
                            />
                          }
                          label="Record Attendance"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              checked={this.state.viewNote}
                              onChange={this.handleChangeChecked('viewNote')}
                              value="viewNote"
                            />
                          }
                          label="View note history"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              checked={this.state.payment}
                              onChange={this.handleChangeChecked('payment')}
                              value="payment"
                            />
                          }
                          label="Take payment"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.viewReport}
                              onChange={this.handleChangeChecked('viewReport')}
                              value="jason"
                            />
                          }
                          label="View/create reports"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              checked={this.state.viewCalendar}
                              onChange={this.handleChangeChecked(
                                'viewCalendar'
                              )}
                              value="viewCalendar"
                            />
                          }
                          label="View own calendar"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              checked={this.state.viewOwnClient}
                              onChange={this.handleChangeChecked(
                                'viewOwnClient'
                              )}
                              value="viewOwnClient"
                            />
                          }
                          label="View own clients"
                        />
                      </FormGroup>
                    </FormControl>
                  </MuiThemeProvider>
                </Grid>
              ) : null}

              {this.state.memberRole === 'Intern' ? (
                <Grid
                  container
                  // direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <MuiThemeProvider theme={theme}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        {/* chunk 1-5 */}

                        <FormControlLabel
                          control={
                            <Switch
                              className={classes.formRoot2}
                              color="primary"
                              checked={this.state.invoice}
                              onChange={this.handleChangeChecked('invoice')}
                              value="invoice"
                            />
                          }
                          label="Invoices/Billing"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.allCalendar}
                              onChange={this.handleChangeChecked('allCalendar')}
                              value="allCalendar"
                            />
                          }
                          label="Calendar of everyone"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.payment}
                              onChange={this.handleChangeChecked('payment')}
                              value="payment"
                            />
                          }
                          label="Take payment"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.editOtherSched}
                              onChange={this.handleChangeChecked(
                                'editOtherSched'
                              )}
                              value="editOtherSched"
                            />
                          }
                          label="Edit other therapist schedule"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.viewOtherSched}
                              onChange={this.handleChangeChecked(
                                'viewOtherSched'
                              )}
                              value="viewOtherSched"
                            />
                          }
                          label="View other therapist schedule"
                        />
                        {/* chunk 6-10 */}
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.editOtherInfo}
                              onChange={this.handleChangeChecked(
                                'editOtherInfo'
                              )}
                              value="editOtherInfo"
                            />
                          }
                          label="Edit other therapist/client info"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.viewOtherInfo}
                              onChange={this.handleChangeChecked(
                                'viewOtherInfo'
                              )}
                              value="viewOtherInfo"
                            />
                          }
                          label="View other therapist/client info"
                        />
                      </FormGroup>
                    </FormControl>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.addClient}
                              onChange={this.handleChangeChecked('addClient')}
                              value="addClient"
                            />
                          }
                          label="Add client"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.recordAttendance}
                              onChange={this.handleChangeChecked(
                                'recordAttendance'
                              )}
                              value="recordAttendance"
                            />
                          }
                          label="Record Attendance"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.viewNote}
                              onChange={this.handleChangeChecked('viewNote')}
                              value="viewNote"
                            />
                          }
                          label="View note history"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.viewClient}
                              onChange={this.handleChangeChecked('viewClient')}
                              value="viewClient"
                            />
                          }
                          label="View other clients vs. own clients"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.viewReport}
                              onChange={this.handleChangeChecked('viewReport')}
                              value="jason"
                            />
                          }
                          label="View/create reports"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              checked={this.state.viewCalendar}
                              onChange={this.handleChangeChecked(
                                'viewCalendar'
                              )}
                              value="viewCalendar"
                            />
                          }
                          label="View own calendar"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              disabled
                              checked={this.state.viewOwnClient}
                              onChange={this.handleChangeChecked(
                                'viewOwnClient'
                              )}
                              value="viewOwnClient"
                            />
                          }
                          label="View own clients"
                        />
                      </FormGroup>
                    </FormControl>
                  </MuiThemeProvider>
                </Grid>
              ) : null}
            </Paper>
          )}
        </Container>
      </div>
    )
  }
}

MemberDetails.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(MemberDetails))

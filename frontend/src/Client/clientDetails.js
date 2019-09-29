import React from "react";
import {withRouter} from 'react-router'
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import NoteHistoryTable from "../Tables/noteHistoryTable";
import Blue from "@material-ui/core/colors/blue";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

import API from '../utils/API'

const styles = theme => ({
  root: {
    marginTop: theme.spacing(10),
    align: "center",
    width: "100%",
    height: "120"
  },

  clientAvatar: {
    margin: 10,
    color: theme.palette.getContrastText(Blue[800]),
    backgroundColor: Blue[800],
    "&:hover": {
      backgroundColor: Blue[400]
    },
    width: 100,
    height: 100,
    fontSize: 40,
    marginBottom: theme.spacing(-18)
    //marginRight: theme.spacing(1) * 20
  },

  toggle: {
    paddingRight: theme.spacing(1) * 30
  },

  marg: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },

 
  input: {
    display: "none"
  },



  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    //marginBottom: theme.spacing(1),
    width: 300
  },

  textField2: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 200
  },

  textField3: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 200
  },

  textFieldSession: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(6),
    width: 300
  },

  textFieldNotes: {
    //marginLeft: theme.spacing(1),
    //marginRight: theme.spacing(1),
    //marginBottom: theme.spacing(2),
    width: 938
  },

  textFieldAlign: {
    marginRight: theme.spacing(50),
    width: 300
    // marginBottom: theme.spacing(5)
  },

  textFieldTest: {
    marginRight: theme.spacing(79),
    width: 300
  },

  textFieldGoal: {
    marginLeft: theme.spacing(10),
    ///marginTop: theme.spacing(1),
    width: 800
  },

  textFieldObj: {
    marginLeft: theme.spacing(20),
    ///marginTop: theme.spacing(1),
    width: 800
  },

  menu: {
    width: 200
  },

  checked: {},

  root2: {
    //flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
    //marginLeft: theme.spacing(1) * 22,
    //marginRight: theme.spacing(1) * 22,
    //marginTop: theme.spacing(1) * 22,
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: Blue[800]
  },

  infoRoot: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },

  margin: {
    margin: theme.spacing(1)
  },

  deleteButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  saveButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  goalButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    /* this is text color */ color: theme.palette.getContrastText("#b2dfdb"),
    backgroundColor: "#b2dfdb",
    "&:hover": {
      backgroundColor: "#80cbc4"
    }
  },

  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { main: "#b2dfdb" }
  }
});

const titles = [
  {
    value: "",
    label: ""
  },

  {
    value: "Dr.",
    label: "Dr."
  },

  {
    value: "Miss",
    label: "Miss"
  },

  {
    value: "Mr.",
    label: "Mr."
  },
  {
    value: "Mrs.",
    label: "Mrs."
  },
  {
    value: "Ms.",
    label: "Ms."
  },
  {
    value: "Mx.",
    label: "Mx."
  }
];

const selectedClient = [
  {
    value: "Billy Joe",
    label: "Billy Joe"
  },

  {
    value: "Ashley Flowers",
    label: "Ashley Flowers"
  },
  {
    value: "John Smith",
    label: "John Smith"
  }
];

const clientTypes = [
  {
    value: "Individual",
    label: "Individual"
  },

  {
    value: "Facility",
    label: "Facility"
  }
];

const sessionTypes = [
  {
    value: "Lessons",
    label: "Lessons"
  },

  {
    value: "Therapy",
    label: "Therapy"
  }
];

const paymentTypes = [
  {
    value: "Card",
    label: "Card"
  },

  {
    value: "Cash",
    label: "Cash"
  },

  {
    value: "Check",
    label: "Check"
  }
];

const cardTypes = [
  {
    value: "American Express",
    label: "American Express"
  },

  {
    value: "Discover",
    label: "Discover"
  },

  {
    value: "MasterCard",
    label: "MasterCard"
  },
  {
    value: "Visa",
    label: "Visa"
  }
];


class ClientDetails extends React.Component {
  state = {
    anchorEl: null,
    clientData: [],
    therapistData: [],
    selectedIndex: null,
    checkedA: true,
    client: "Jaren Jones",
    open: false,
    cost: "",
    length: "",
    clientType: "Individual",
    tabValue: 0,
    snackbarOpenWarning: false,
    snackbarOpenSuccess: false,
    snackbarOpenError: false,
    // CLIENT INFO TAB
    clientFirstName: "Jaren",
    clientFacility: null,
    clientLastName: "Jones",
    clientEmail: "jjones@mail.com",
    clientTitle: "Mr.",
    clientTherapist: "Harry Potter",
    sessionLength: "30",
    sessionCost: "$40",
    sessionType: "Therapy",
    clientCurrentPassword: "test123",
    clientConfirmPassword: "test123",
    clientPhone: "123-456-1111",
    clientStreetAddress: "123 Maple Street",
    clientBday: "2/20/1998",
    clientCity: "Plano",
    clientZipCode: "75023",
    clientState: "TX",
    clientNotes: "",
    multiline: "Controlled",
    deleteDialog: false,
    // CONTACT TAB
    contactFirstName: "Jaren",
    contactLastName: "Jones",
    contactEmail: "jjones@mail.com",
    contactAddress: "123 Maple Street",
    contactTitle: "Mr.",
    contactPhone: "123-456-1111",
    contactCity: "Plano",
    contactState: "TX",
    contactZip: "75023",
    // multiline: "Controlled"
    // PAYOR TAB
    billingFirstName: "Jack",
    billingLastName: "Jones",
    nameOnCard: "Jack A. Jones",
    cardNum: "111122223333",
    payorEmail: "jackjones@mail.com",
    paymentType: "Card",
    billingPhone: "123-456-1111",
    billingAddress: "123 Maple Street",
    billingCity: "Plano",
    billingZip: "75023",
    billingState: "TX",
    cvv: "000",
    expDate: "03/17",
    cardType: "Visa",
    sameAsContact: false,
    // GOALS TAB
   // add goals
   addGoal1: false,
   addGoal2: false,
   addGoal3: false,
   addGoal4: false,
   addGoal5: false,
   addGoal6: false,
   addGoal7: false,
   addGoal8: false,
   addGoal9: false,
   addGoal10: false,
   // add objectives
   addObj1_1: false,
   addObj1_2: false,
   addObj1_3: false,
   addObj2_1: false,
   addObj2_2: false,
   addObj2_3: false,
   addObj3_1: false,
   addObj3_2: false,
   addObj3_3: false,
   addObj4_1: false,
   addObj4_2: false,
   addObj4_3: false,
   addObj5_1: false,
   addObj5_2: false,
   addObj5_3: false,
   addObj6_1: false,
   addObj6_2: false,
   addObj6_3: false,
   addObj7_1: false,
   addObj7_2: false,
   addObj7_3: false,
   addObj8_1: false,
   addObj8_2: false,
   addObj8_3: false,
   addObj9_1: false,
   addObj9_2: false,
   addObj9_3: false,
   addObj10_1: false,
   addObj10_2: false,
   addObj10_3: false,
   //1
   goal1: null,
   obj1_1: null,
   obj1_2: null,
   obj1_3: null,
   // 2
   goal2: null,
   obj2_1: null,
   obj2_2: null,
   obj2_3: null,
   //3
   goal3: null,
   obj3_1: null,
   obj3_2: null,
   obj3_3: null,
   //4
   goal4: null,
   obj4_1: null,
   obj4_2: null,
   obj4_3: null,
   //5
   goal5: null,
   obj5_1: null,
   obj5_2: null,
   obj5_3: null,
   //6
   goal6: null,
   obj6_1: null,
   obj6_2: null,
   obj6_3: null,
   //7
   goal7: null,
   obj7_1: null,
   obj7_2: null,
   obj7_3: null,
   //8
   goal8: null,
   obj8_1: null,
   obj8_2: null,
   obj8_3: null,
   //9
   goal9: null,
   obj9_1: null,
   obj9_2: null,
   obj9_3: null,
   //10
   goal10: null,
   obj10_1: null,
   obj10_2: null,
   obj10_3: null,
   // active goals
   activeGoal1: false,
   activeGoal2: false,
   activeGoal3: false,
   activeGoal4: false,
   activeGoal5: false,
   activeGoal6: false,
   activeGoal7: false,
   activeGoal8: false,
   activeGoal9: false,
   activeGoal10: false,
  };

  handleClickAvatar = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseAvatar = () => {
    this.setState({ anchorEl: null });
  };

  handleChangeChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  /* change of client dropdown */
  handleChange = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      if (name === 'client') this.changeContentWithClientId()
    });
  };

  handleChangeTabs = (event, tabValue) => {
    this.setState({ tabValue });
  };

  handleDeleteDialogOpen = () => {
    this.setState({ deleteDialog: true });
  };

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialog: false });
  };

  handleChangeChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleGoalActive = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleAdd1stGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal1: !this.state.activeGoal1,
      addGoal1: !this.state.addGoal1,
      goal1: null,
      obj1_1: null,
      obj1_2: null,
      obj1_3: null
    });
  };

  handleAdd2ndGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal2: !this.state.activeGoal2,
      addGoal2: !this.state.addGoal2,
      goal2: null,
      obj2_1: null,
      obj2_2: null,
      obj2_3: null
    });
  };

  handleAdd3rdGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal3: !this.state.activeGoal3,
      addGoal3: !this.state.addGoal3,
      goal3: null,
      obj3_1: null,
      obj3_2: null,
      obj3_3: null
    });
  };

  handleAdd4thGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal4: !this.state.activeGoal4,
      addGoal4: !this.state.addGoal4,
      goal4: null,
      obj4_1: null,
      obj4_2: null,
      obj4_3: null
    });
  };

  handleAdd5thGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal5: !this.state.activeGoal5,
      addGoal5: !this.state.addGoal5,
      goal5: null,
      obj5_1: null,
      obj5_2: null,
      obj5_3: null
    });
  };

  handleAdd6thGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal6: !this.state.activeGoal6,
      addGoal6: !this.state.addGoal6,
      goal6: null,
      obj6_1: null,
      obj6_2: null,
      obj6_3: null
    });
  };

  handleAdd7thGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal7: !this.state.activeGoal7,
      addGoal7: !this.state.addGoal7,
      goal7: null,
      obj7_1: null,
      obj7_2: null,
      obj7_3: null
    });
  };

  handleAdd8thGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal8: !this.state.activeGoal8,
      addGoal8: !this.state.addGoal8,
      goal8: null,
      obj8_1: null,
      obj8_2: null,
      obj8_3: null
    });
  };

  handleAdd9thGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal9: !this.state.activeGoal9,
      addGoal9: !this.state.addGoal9,
      goal9: null,
      obj9_1: null,
      obj9_2: null,
      obj9_3: null
    });
  };

  handleAdd10thGoal = name => event => {
    this.setState({
      [name]: event.target.checked,
      activeGoal10: !this.state.activeGoal10,
      addGoal10: !this.state.addGoal10,
      goal10: null,
      obj10_1: null,
      obj10_2: null,
      obj10_3: null
    });
  };

  async componentDidMount() {
    try {
      const therapistsResp = await API.get('/members/getTherapists')
      const clientsResp = await API.get('/clients/all')
      const therapists = therapistsResp.data.data
      const clients = clientsResp.data.data
      this.setState({therapistData: therapists, clientData: clients, client: this.props.location.state.curClientId}, () => {
        this.changeContentWithClientId()
      })
    } catch (error) {
      console.log('Client data fetching error: ', error);
    }
  }

  changeContentWithClientId() {
    const client = this.state.clientData.find(
      ({ id }) => id === this.state.client
    )
    if (client) {
      const {
        id,
        client_type,
        client_full_name,
        client_first_name,
        client_last_name,
        email,
        title,
        assi_therapist_full_name,
        assi_therapist_last,
        facility,
        session_length,
        session_cost,
        session_type,
        password,
        phone,
        street_address,
        bday,
        city,
        zip,
        state,
        notes,
        // Contact tab
        contact_first_name,
        contact_last_name,
        contact_email,
        contact_street_address,
        contact_phone,
        contact_city,
        contact_state,
        contact_zip,
        // Payor tab
        billing_first_name,
        billing_last_name,
        name_on_card,
        card_num,
        payment_type,
        billing_phone,
        billing_street_address,
        billing_city,
        billing_zip,
        billing_state,
        cvv,
        card_exp_date,
        card_type        
      } = client

      this.setState({
        clientType: client_type,
        // CLIENT INFO TAB
        clientFirstName: client_first_name,
        clientFacility: facility,
        clientLastName: client_last_name,
        clientEmail: email,
        clientTitle: title,
        clientTherapist: assi_therapist_full_name,
        sessionLength: session_length,
        sessionCost: session_cost,
        sessionType: session_type,
        clientCurrentPassword: password,
        clientConfirmPassword: password,
        clientPhone: phone,
        clientStreetAddress: street_address,
        clientBday: bday,
        clientCity: city,
        clientZipCode: zip,
        clientState: state,
        clientNotes: notes,
        multiline: "Controlled",
        deleteDialog: false,
        // CONTACT TAB
        contactFirstName: contact_first_name,
        contactLastName: contact_last_name,
        contactEmail: contact_email,
        contactAddress: contact_street_address,
        contactTitle: title,
        contactPhone: contact_phone,
        contactCity: contact_city,
        contactState: contact_state,
        contactZip: contact_zip,
        // multiline: "Controlled"
        // PAYOR TAB
        billingFirstName: billing_first_name,
        billingLastName: billing_last_name,
        nameOnCard: name_on_card,
        cardNum: card_num,
        payorEmail: email,
        paymentType: payment_type,
        billingPhone: billing_phone,
        billingAddress: billing_street_address,
        billingCity: billing_city,
        billingZip: billing_zip,
        billingState: billing_state,
        cvv: cvv,
        expDate: card_exp_date,
        cardType: card_type,
      })
    }
  }

  componentWillUnmount() {
  }

  render() {
    const { classes } = this.props;

    const { anchorEl, tabValue, clientData, therapistData } = this.state;

    return (
      <div>
        <Container maxWidth="lg">
          {/* Avatar */}
          <Grid container justify="center" alignItems="center">
            <IconButton
              color="primary"
              className={classes.clientAvatar}
              onClick={this.handleClickAvatar}
            >
              JJ
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "center", horizontal: "center" }}
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
                <MenuItem onClick={this.handleCloseAvatar}>
                  Upload Picture{" "}
                </MenuItem>
              </label>
              <MenuItem onClick={this.handleCloseAvatar}>
                Remove Picture
              </MenuItem>
            </Menu>
          </Grid>
          <Paper className={classes.root} elevation={2}>
            <Grid container justify="flex-start">
              <MuiThemeProvider theme={theme}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.checkedA}
                        onChange={this.handleChangeChecked("checkedA")}
                        value="checkedA"
                        className={classes.marg}
                
                        color="primary"
                      />
                    }
                    label="Active"
                  />
                </FormGroup>
              </MuiThemeProvider>
            </Grid>

            {/* client drop down */}
            <Grid container justify="space-between">
              <TextField
                required
                id="newClient"
                select
                label="Client"
                className={classes.textField}
                value={this.state.client}
                onChange={this.handleChange("client")}
                //helperText="Please select your currency"
                margin="normal"
                variant="outlined"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {clientData.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.client_full_name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="standard-select-member"
                select
                margin="normal"
                label="Client Type"
                variant="outlined"
                className={classes.textField2}
                value={this.state.clientType}
                onChange={this.handleChange("clientType")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {clientTypes.map((option, i) => (
                  <MenuItem key={i} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Paper>

          <AppBar className={classes.root2} position="static">
            <Tabs
              indicatorColor="primary"
              value={tabValue}
              onChange={this.handleChangeTabs}
            >
              <Tab label="Client Information" />
              <Tab label="Contact Information" />
              <Tab label="Payor Information" />
              <Tab label="Note History" />
              <Tab label="Message History" />
              <Tab label="Goals & Objectives" />
            </Tabs>
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
                    label="Title"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.clientTitle}
                    margin="normal"
                    onChange={this.handleChange("clientTitle")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {titles.map(option => (
                      <MenuItem key={option.value} value={option.value}>
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
                      className={classes.textField}
                      value={this.state.clientFirstName}
                      onChange={this.handleChange("clientFirstName")}
                      margin="normal"
                    />
                  </MuiThemeProvider>
                  <TextField
                    required
                    id="standard-lastNamename"
                    label="Last Name"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.clientLastName}
                    onChange={this.handleChange("clientLastName")}
                    margin="normal"
                  />
                  <TextField
                    required
                    id="standard-email"
                    variant="outlined"
                    label="Email"
                    className={classes.textField}
                    value={this.state.clientEmail}
                    onChange={this.handleChange("clientEmail")}
                    margin="normal"
                  />
                  <TextField
                    required
                    id="standard-password-input"
                    variant="outlined"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    value={this.state.clientCurrentPassword}
                    onChange={this.handleChange("clientCurrentPassword")}
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
                    value={this.state.clientConfirmPassword}
                    onChange={this.handleChange("confirmPassword")}
                    //autoComplete="current-password"
                    margin="normal"
                  />

                  <TextField
                    id="standard-address"
                    variant="outlined"
                    label="Address"
                    className={classes.textField}
                    value={this.state.clientStreetAddress}
                    onChange={this.handleChange("clientAddress")}
                    margin="normal"
                  />
                  <TextField
                    id="standard-city-"
                    variant="outlined"
                    label="City"
                    className={classes.textField}
                    value={this.state.clientCity}
                    onChange={this.handleChange("clientCity")}
                    margin="normal"
                  />
                  <TextField
                    id="standard-state"
                    variant="outlined"
                    label="State"
                    className={classes.textField}
                    value={this.state.clientState}
                    onChange={this.handleChange("clientState")}
                    margin="normal"
                  />
                  <TextField
                    id="standard-zipCode"
                    variant="outlined"
                    label="Zip Code"
                    className={classes.textField}
                    value={this.state.clientZipCode}
                    onChange={this.handleChange("clientZipCode")}
                    margin="normal"
                  />
                  <TextField
                    id="standard-phone"
                    variant="outlined"
                    label="Phone Number"
                    className={classes.textField}
                    value={this.state.clientPhone}
                    onChange={this.handleChange("clientPhone")}
                    margin="normal"
                  />
                  <TextField
                    id="standard-bday"
                    variant="outlined"
                    label="Birthday"
                    className={classes.textField}
                    value={this.state.clientBday}
                    onChange={this.handleChange("clientBday")}
                    margin="normal"
                  />

                  {/* insert facility name here */}

                  {this.state.clientType === "Facility" ? (
                    <TextField
                      required
                      id="standard-facility-name"
                      label="Facility Name"
                      variant="outlined"
                      className={classes.textFieldTest}
                      value={this.state.clientFacility}
                      onChange={this.handleChange("clientFacility")}
                      margin="normal"
                    />
                  ) : null}
                  <Grid container justify="center" alignItems="center">
                    <TextField
                      id="standard-select-sessionType"
                      select
                      label="Session Type"
                      variant="outlined"
                      margin="normal"
                      className={classes.textFieldSession}
                      value={this.state.sessionType}
                      onChange={this.handleChange("sessionType")}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                    >
                      {sessionTypes.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="standard-cost"
                      label="Session Cost (dollars)"
                      variant="outlined"
                      className={classes.textFieldSession}
                      value={this.state.sessionCost}
                      onChange={this.handleChange("sessionCost")}
                      margin="normal"
                    />
                    <TextField
                      id="standard-length"
                      label="Session Length (minutes)"
                      variant="outlined"
                      className={classes.textFieldSession}
                      value={this.state.sessionLength}
                      onChange={this.handleChange("sessionLength")}
                      margin="normal"
                    />
                    <Grid container justify="center" alignItems="center">
                      <TextField
                        id="standard-select-therapist"
                        select
                        label="Therapist"
                        variant="outlined"
                        margin="normal"
                        className={classes.textFieldTest}
                        value={this.state.clientTherapist}
                        onChange={this.handleChange("clientTherapist")}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                      >
                        {therapistData.map(option => (
                          <MenuItem
                            key={option.id}
                            value={option.member_full_name}
                          >
                            {option.member_full_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid container justify="center">
                    <MuiThemeProvider theme={theme}>
                      <TextField
                        id="standard-full-width"
                        //label="Additional Notes"
                        style={{ margin: 8 }}
                        className={classes.textFieldNotes}
                        value={this.state.clientNotes}
                        onChange={this.handleChange("clientNotes")}
                        placeholder="Add any additional notes here"
                        //fullWidth
                        multiline
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </MuiThemeProvider>
                  </Grid>
                  <Grid container justify="space-between">
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
                        Are you sure you want to delete this client?
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Once this client has been deleted, it cannot be
                          undone. If this client has references elsewhere, this
                          client will be marked as inactive.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleDeleteDialogClose}>
                          No
                        </Button>
                        <Button
                          onClick={this.handleDeleteDialogClose}
                          autoFocus
                        >
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
                </Grid>
              </Paper>
            </form>
          )

          /* <ClientInfo />*/
          }
          {tabValue === 1 && (
            <form className={classes.container} noValidate autoComplete="off">
              <Paper className={classes.infoRoot} elevation={2}>
                {/*  Contact 1 */}
                <Grid container justify="center" alignItems="center">
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      id="standard-select-contactTitle"
                      select
                      label="Title"
                      variant="outlined"
                      margin="normal"
                      className={classes.textField}
                      value={this.state.contactTitle}
                      onChange={this.handleChange("contactTitle")}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                    >
                      {titles.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </MuiThemeProvider>
                  <TextField
                    required
                    id="standard-contactFirstName"
                    label="First Name"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.contactFirstName}
                    onChange={this.handleChange("contactFirstName")}
                    margin="normal"
                  />
                  <TextField
                    required
                    id="standard-lastNamename"
                    label="Last Name"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.contactLastName}
                    onChange={this.handleChange("contactLastName")}
                    margin="normal"
                  />
                  <TextField
                    id="standard-contactAddress"
                    variant="outlined"
                    label="Street Address"
                    className={classes.textField}
                    value={this.state.contactAddress}
                    onChange={this.handleChange("contactAddress")}
                    margin="normal"
                  />
                  <TextField
                    id="standard-contactCity-"
                    variant="outlined"
                    label="City"
                    className={classes.textField}
                    value={this.state.contactCity}
                    onChange={this.handleChange("contactCity")}
                    margin="normal"
                  />
                  <TextField
                    id="standard-state"
                    variant="outlined"
                    label="State"
                    className={classes.textField}
                    value={this.state.contactState}
                    onChange={this.handleChange("contactState")}
                    margin="normal"
                  />
                  <TextField
                    id="standard-contactZip"
                    variant="outlined"
                    label="Zip Code"
                    className={classes.textField}
                    value={this.state.contactZip}
                    onChange={this.handleChange("contactZip")}
                    margin="normal"
                  />

                  <TextField
                    id="standard-contactPhone"
                    variant="outlined"
                    label="Phone Number"
                    className={classes.textField}
                    value={this.state.contactPhone}
                    onChange={this.handleChange("contactPhone")}
                    margin="normal"
                  />
                  <TextField
                    id="standard-contactPhone"
                    variant="outlined"
                    label="Secondary Phone Number"
                    className={classes.textField}
                    value={this.state.contact2ndPhone}
                    onChange={this.handleChange("contact2ndPhone")}
                    margin="normal"
                  />
                  <Grid container justify="center">
                    <TextField
                      required
                      id="standard-contactEmail"
                      variant="outlined"
                      label="Email"
                      className={classes.textFieldAlign}
                      value={this.state.contactEmail}
                      onChange={this.handleChange("contactEmail")}
                      margin="normal"
                    />
                    <MuiThemeProvider theme={theme}>
                      <FormGroup className={classes.alignCheck} row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={this.state.contactCheckedRecEmails}
                              onChange={this.handleChangeChecked(
                                "contactCheckedRecEmails"
                              )}
                              classes={{
                                root: classes.checkedRoot,
                                checked: classes.checked
                              }}
                              value="contactCheckedRecEmails"
                            />
                          }
                          label="Receive email notifcations"
                        />
                      </FormGroup>
                    </MuiThemeProvider>
                  </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between">
                  {/*
            <Button
              size="medium"
              variant="contained"
              className={classes.button}
            >
              Add Additional
            </Button>
            */}
                  <Grid container justify="flex-end">
                    <Button
                      className={classes.saveButton}
                      size="large"
                      variant="contained"
                      onClick={this.handleSnackOpenSuccess}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          )}
          {tabValue === 2 && (
            <form className={classes.container} noValidate autoComplete="off">
              <Paper className={classes.infoRoot} elevation={2}>
                <Grid container justify="space-between">
                  <MuiThemeProvider theme={theme}>
                    <FormGroup className={classes.marg} row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.sameAsContact}
                            onChange={this.handleChangeChecked("sameAsContact")}
                            value="sameAsContact"
                            color="primary"
                          />
                        }
                        label="Same as contact" /* same as contact 1 */
                      />
                    </FormGroup>
                  </MuiThemeProvider>
                </Grid>
                <Grid container justify="center" alignItems="center">
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      required
                      id="billingFirstName"
                      label="First Name"
                      variant="outlined"
                      className={classes.textField}
                      value={this.state.billingFirstName}
                      onChange={this.handleChange("billingFirstName")}
                      margin="normal"
                    />
                  </MuiThemeProvider>
                  <TextField
                    required
                    id="billingLastName"
                    label="Last Name"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.billingLastName}
                    onChange={this.handleChange("billingLastName")}
                    margin="normal"
                  />
                  <TextField
                    id="standard-select-paymentType"
                    select
                    label="Payment Type"
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.paymentType}
                    onChange={this.handleChange("paymentType")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {paymentTypes.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="standard-select-cardType"
                    select
                    label="Card Type"
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.cardType}
                    onChange={this.handleChange("cardType")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {cardTypes.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    required
                    id="standard-nameOnCard"
                    label="Name on Card"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.nameOnCard}
                    onChange={this.handleChange("nameOnCard")}
                    margin="normal"
                  />

                  <TextField
                    required
                    id="standard-cardNum"
                    label="Card Number"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.cardNum}
                    onChange={this.handleChange("cardNum")}
                    margin="normal"
                  />

                  <TextField
                    required
                    id="standard-cvv"
                    label="CVV"
                    type="password"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.cvv}
                    onChange={this.handleChange("cvv")}
                    margin="normal"
                  />

                  <TextField
                    id="standard-expDate"
                    variant="outlined"
                    label="Expiration Date"
                    className={classes.textField}
                    value={this.state.expDate}
                    onChange={this.handleChange("expDate")}
                    margin="normal"
                  />

                  <TextField
                    id="standard-billingAddress"
                    variant="outlined"
                    label="Billing Street Address"
                    className={classes.textField}
                    value={this.state.billingAddress}
                    onChange={this.handleChange("billingAddress")}
                    margin="normal"
                  />

                  <TextField
                    id="standard-billingCity-"
                    variant="outlined"
                    label="City"
                    className={classes.textField}
                    value={this.state.billingCity}
                    onChange={this.handleChange("billingCity")}
                    margin="normal"
                  />

                  <TextField
                    required
                    id="standard-payorEmail"
                    variant="outlined"
                    label="Email"
                    className={classes.textField}
                    value={this.state.payorEmail}
                    onChange={this.handleChange("payorEmail")}
                    margin="normal"
                  />

                  <TextField
                    id="standard-state"
                    variant="outlined"
                    label="State"
                    className={classes.textField}
                    value={this.state.billingState}
                    onChange={this.handleChange("billingState")}
                    margin="normal"
                  />

                  <TextField
                    id="standard-phone"
                    variant="outlined"
                    label="Phone Number"
                    className={classes.textField}
                    value={this.state.billingPhone}
                    onChange={this.handleChange("billingPhone")}
                    margin="normal"
                  />

                  <TextField
                    id="standard-billingZip"
                    variant="outlined"
                    label="Zip Code"
                    className={classes.textField}
                    value={this.state.billingZip}
                    onChange={this.handleChange("billingZip")}
                    margin="normal"
                  />
                </Grid>

                <Grid container justify="flex-end">
                  <Button
                    className={classes.saveButton}
                    size="large"
                    variant="contained"
                    onClick={this.handleSnackOpenSuccess}
                  >
                    Save
                  </Button>
                </Grid>
              </Paper>
            </form>
          )}
          {/* Note History */}
          {tabValue === 3 && <NoteHistoryTable />}
          {/* Message History */}
          {tabValue === 4 && <Paper>Message History</Paper>}
          {/* Goals & Objectives */}
          {tabValue === 5 && (
            <form className={classes.container} noValidate autoComplete="off">
              <Paper className={classes.infoRoot} elevation={2}>
              {this.state.addGoal1 ? null : (
              <Typography className={classes.title} align="center" variant="h6">
                It looks like you haven't added any goals or objectives. Check
                the box below to begin adding some!
              </Typography>
            )}
            {this.state.addGoal1 ? null : (
              <Grid container justify="center">
                <Container>
                  <FormGroup className={classes.checkBoxPadding} row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.addGoal1}
                          onChange={this.handleAdd1stGoal("addGoal1")}
                          classes={{
                            root: classes.checkedRoot,
                            checked: classes.checked
                          }}
                          value={this.state.addGoal1}
                        />
                      }
                      label="Add goal"
                    />
                  </FormGroup>
                </Container>
              </Grid>
            )}

            {this.state.addGoal1 ? (
              <Grid container direction="column">
                <Container>
                  <FormGroup className={classes.checkBoxPadding} row>
                    <FormControlLabel
                      control={
                        <MuiThemeProvider theme={theme}>
                          <Checkbox
                            color="primary"
                            checked={this.state.addGoal1}
                            onChange={this.handleAdd1stGoal("addGoal1")}
                            classes={{
                              root: classes.checkedRoot,
                              checked: classes.checked
                            }}
                            value={this.state.addGoal1}
                          />
                        </MuiThemeProvider>
                      }
                      label="Add goal"
                    />
                  </FormGroup>
                </Container>

                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormControlLabel
                      className={classes.marg}
                      control={
                        <Switch
                          checked={this.state.activeGoal1}
                          onChange={this.handleChangeChecked("activeGoal1")}
                          value={this.state.activeGoal1}
                          color="primary"
                        />
                      }
                      label="Active Goal"
                    />
                  </FormGroup>
                </MuiThemeProvider>
                <TextField
                  required
                  multiline
                  id="goal1"
                  label="Goal 1"
                  variant="outlined"
                  className={classes.textFieldGoal}
                  value={this.state.goal1}
                  onChange={this.handleChange("goal1")}
                  margin="normal"
                />

                <TextField
                  multiline
                  id="obj 1_1"
                  label="Objective 1_1"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj1_1}
                  onChange={this.handleChange("obj1_1")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 1_2"
                  label="Objective 1_2"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj1_2}
                  onChange={this.handleChange("obj1_2")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 1_3"
                  label="Objective 1_3"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj1_3}
                  onChange={this.handleChange("obj1_3")}
                  margin="normal"
                />
                <Container>
                  <FormGroup className={classes.checkBoxPadding} row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.addGoal2}
                          onChange={this.handleAdd2ndGoal("addGoal2")}
                          classes={{
                            root: classes.checkedRoot,
                            checked: classes.checked
                          }}
                          value="addGoal2"
                        />
                      }
                      label="Add additional goal"
                    />
                  </FormGroup>
                </Container>
              </Grid>
            ) : null}

            {this.state.addGoal2 ? (
              <Grid container direction="column">
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormControlLabel
                      className={classes.marg}
                      control={
                        <Switch
                          checked={this.state.activeGoal2}
                          onChange={this.handleGoalActive("activeGoal2")}
                          value={this.state.activeGoal2}
                          color="primary"
                        />
                      }
                      label="Active Goal"
                    />
                  </FormGroup>
                </MuiThemeProvider>
                <TextField
                  required
                  multiline
                  id="goal2"
                  label="Goal 2"
                  variant="outlined"
                  className={classes.textFieldGoal}
                  value={this.state.goal2}
                  onChange={this.handleChange("goal2")}
                  margin="normal"
                />

                <TextField
                  multiline
                  id="obj 2_1"
                  label="Objective 2_1"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj2_1}
                  onChange={this.handleChange("obj2_1")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 2_2"
                  label="Objective 2_2"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj2_2}
                  onChange={this.handleChange("obj2_2")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 2_3"
                  label="Objective 2_3"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj2_3}
                  onChange={this.handleChange("obj2_3")}
                  margin="normal"
                />
                <Container>
                  <FormGroup className={classes.checkBoxPadding} row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.addGoal3}
                          onChange={this.handleAdd3rdGoal("addGoal3")}
                          classes={{
                            root: classes.checkedRoot,
                            checked: classes.checked
                          }}
                          value={this.state.addGoal3}
                        />
                      }
                      label="Add additional goal"
                    />
                  </FormGroup>
                </Container>
              </Grid>
            ) : null}

            {this.state.addGoal3 ? (
              <Grid container direction="column">
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormControlLabel
                      className={classes.marg}
                      control={
                        <Switch
                          checked={this.state.activeGoal3}
                          onChange={this.handleGoalActive("activeGoal3")}
                          value={this.state.activeGoal3}
                          color="primary"
                        />
                      }
                      label="Active Goal"
                    />
                  </FormGroup>
                </MuiThemeProvider>
                <TextField
                  required
                  multiline
                  id="goal3"
                  label="Goal 3"
                  variant="outlined"
                  className={classes.textFieldGoal}
                  value={this.state.goal3}
                  onChange={this.handleChange("goal3")}
                  margin="normal"
                />

                <TextField
                  multiline
                  id="obj 3_1"
                  label="Objective 3_1"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj3_1}
                  onChange={this.handleChange("obj3_1")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 3_2"
                  label="Objective 3_2"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj3_2}
                  onChange={this.handleChange("obj3_2")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 3_3"
                  label="Objective 3_3"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj3_3}
                  onChange={this.handleChange("obj3_3")}
                  margin="normal"
                />
                <Container>
                  <FormGroup className={classes.checkBoxPadding} row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.addGoal4}
                          onChange={this.handleAdd4thGoal("addGoal4")}
                          classes={{
                            root: classes.checkedRoot,
                            checked: classes.checked
                          }}
                          value={this.state.addGoal4}
                        />
                      }
                      label="Add additional goal"
                    />
                  </FormGroup>
                </Container>
              </Grid>
            ) : null}

            {this.state.addGoal4 ? (
              <Grid container direction="column">
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormControlLabel
                      className={classes.marg}
                      control={
                        <Switch
                          checked={this.state.activeGoal4}
                          onChange={this.handleGoalActive("activeGoal4")}
                          value={this.state.activeGoal4}
                          color="primary"
                        />
                      }
                      label="Active Goal"
                    />
                  </FormGroup>
                </MuiThemeProvider>
                <TextField
                  required
                  multiline
                  id="goal4"
                  label="Goal 4"
                  variant="outlined"
                  className={classes.textFieldGoal}
                  value={this.state.goal4}
                  onChange={this.handleChange("goal4")}
                  margin="normal"
                />

                <TextField
                  multiline
                  id="obj 4_1"
                  label="Objective 4_1"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj4_1}
                  onChange={this.handleChange("obj4_1")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 4_2"
                  label="Objective 4_2"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj4_2}
                  onChange={this.handleChange("obj4_2")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 4_3"
                  label="Objective 4_3"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj4_3}
                  onChange={this.handleChange("obj4_3")}
                  margin="normal"
                />
                <Container>
                  <FormGroup className={classes.checkBoxPadding} row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.addGoal5}
                          onChange={this.handleAdd5thGoal("addGoal5")}
                          classes={{
                            root: classes.checkedRoot,
                            checked: classes.checked
                          }}
                          value={this.state.addGoal5}
                        />
                      }
                      label="Add additional goal"
                    />
                  </FormGroup>
                </Container>
              </Grid>
            ) : null}

            {this.state.addGoal5 ? (
              <Grid container direction="column">
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormControlLabel
                      className={classes.marg}
                      control={
                        <Switch
                          checked={this.state.activeGoal5}
                          onChange={this.handleGoalActive("activeGoal5")}
                          value={this.state.activeGoal5}
                          color="primary"
                        />
                      }
                      label="Active Goal"
                    />
                  </FormGroup>
                </MuiThemeProvider>
                <TextField
                  required
                  multiline
                  id="goal5"
                  label="Goal 5"
                  variant="outlined"
                  className={classes.textFieldGoal}
                  value={this.state.goal5}
                  onChange={this.handleChange("goal5")}
                  margin="normal"
                />

                <TextField
                  multiline
                  id="obj 5_1"
                  label="Objective 5_1"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj5_1}
                  onChange={this.handleChange("obj5_1")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 5_2"
                  label="Objective 5_2"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj5_2}
                  onChange={this.handleChange("obj5_2")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 5_3"
                  label="Objective 5_3"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj5_3}
                  onChange={this.handleChange("obj5_3")}
                  margin="normal"
                />
                <Container>
                  <FormGroup className={classes.checkBoxPadding} row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.addGoal6}
                          onChange={this.handleAdd6thGoal("addGoal6")}
                          classes={{
                            root: classes.checkedRoot,
                            checked: classes.checked
                          }}
                          value={this.state.addGoal6}
                        />
                      }
                      label="Add additional goal"
                    />
                  </FormGroup>
                </Container>
              </Grid>
            ) : null}

            {this.state.addGoal6 ? (
              <Grid container direction="column">
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormControlLabel
                      className={classes.marg}
                      control={
                        <Switch
                          checked={this.state.activeGoal6}
                          onChange={this.handleGoalActive("activeGoal6")}
                          value={this.state.activeGoal6}
                          color="primary"
                        />
                      }
                      label="Active Goal"
                    />
                  </FormGroup>
                </MuiThemeProvider>
                <TextField
                  required
                  multiline
                  id="goal6"
                  label="Goal 6"
                  variant="outlined"
                  className={classes.textFieldGoal}
                  value={this.state.goal6}
                  onChange={this.handleChange("goal6")}
                  margin="normal"
                />

                <TextField
                  multiline
                  id="obj 6_1"
                  label="Objective 6_1"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj6_1}
                  onChange={this.handleChange("obj6_1")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 6_2"
                  label="Objective 6_2"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj6_2}
                  onChange={this.handleChange("obj6_2")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 6_3"
                  label="Objective 6_3"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj6_3}
                  onChange={this.handleChange("obj6_3")}
                  margin="normal"
                />
                <Container>
                  <FormGroup className={classes.checkBoxPadding} row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.addGoal7}
                          onChange={this.handleAdd7thGoal("addGoal7")}
                          classes={{
                            root: classes.checkedRoot,
                            checked: classes.checked
                          }}
                          value={this.state.addGoal7}
                        />
                      }
                      label="Add additional goal"
                    />
                  </FormGroup>
                </Container>
              </Grid>
            ) : null}

            {this.state.addGoal7 ? (
              <Grid container direction="column">
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormControlLabel
                      className={classes.marg}
                      control={
                        <Switch
                          checked={this.state.activeGoal7}
                          onChange={this.handleGoalActive("activeGoal7")}
                          value={this.state.activeGoal7}
                          color="primary"
                        />
                      }
                      label="Active Goal"
                    />
                  </FormGroup>
                </MuiThemeProvider>
                <TextField
                  required
                  multiline
                  id="goal7"
                  label="Goal 7"
                  variant="outlined"
                  className={classes.textFieldGoal}
                  value={this.state.goal7}
                  onChange={this.handleChange("goal7")}
                  margin="normal"
                />

                <TextField
                  multiline
                  id="obj 7_1"
                  label="Objective 7_1"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj7_1}
                  onChange={this.handleChange("obj7_1")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 7_2"
                  label="Objective 7_2"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj7_2}
                  onChange={this.handleChange("obj7_2")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 7_3"
                  label="Objective 7_3"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj7_3}
                  onChange={this.handleChange("obj7_3")}
                  margin="normal"
                />
                <Container>
                  <FormGroup className={classes.checkBoxPadding} row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.addGoal8}
                          onChange={this.handleAdd8thGoal("addGoal8")}
                          classes={{
                            root: classes.checkedRoot,
                            checked: classes.checked
                          }}
                          value={this.state.addGoal8}
                        />
                      }
                      label="Add additional goal"
                    />
                  </FormGroup>
                </Container>
              </Grid>
            ) : null}

            {this.state.addGoal8 ? (
              <Grid container direction="column">
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormControlLabel
                      className={classes.marg}
                      control={
                        <Switch
                          checked={this.state.activeGoal8}
                          onChange={this.handleGoalActive("activeGoal8")}
                          value={this.state.activeGoal8}
                          color="primary"
                        />
                      }
                      label="Active Goal"
                    />
                  </FormGroup>
                </MuiThemeProvider>
                <TextField
                  required
                  multiline
                  id="goal8"
                  label="Goal 8"
                  variant="outlined"
                  className={classes.textFieldGoal}
                  value={this.state.goal8}
                  onChange={this.handleChange("goal8")}
                  margin="normal"
                />

                <TextField
                  multiline
                  id="obj 8_1"
                  label="Objective 8_1"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj8_1}
                  onChange={this.handleChange("obj8_1")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 8_2"
                  label="Objective 8_2"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj8_2}
                  onChange={this.handleChange("obj8_2")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 8_3"
                  label="Objective 8_3"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj8_3}
                  onChange={this.handleChange("obj8_3")}
                  margin="normal"
                />
                <Container>
                  <FormGroup className={classes.checkBoxPadding} row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.addGoal9}
                          onChange={this.handleAdd9thGoal("addGoal9")}
                          classes={{
                            root: classes.checkedRoot,
                            checked: classes.checked
                          }}
                          value={this.state.addGoal9}
                        />
                      }
                      label="Add additional goal"
                    />
                  </FormGroup>
                </Container>
              </Grid>
            ) : null}

            {this.state.addGoal9 ? (
              <Grid container direction="column">
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormControlLabel
                      className={classes.marg}
                      control={
                        <Switch
                          checked={this.state.activeGoal9}
                          onChange={this.handleGoalActive("activeGoal9")}
                          value={this.state.activeGoal9}
                          color="primary"
                        />
                      }
                      label="Active Goal"
                    />
                  </FormGroup>
                </MuiThemeProvider>
                <TextField
                  required
                  multiline
                  id="goal9"
                  label="Goal 9"
                  variant="outlined"
                  className={classes.textFieldGoal}
                  value={this.state.goal9}
                  onChange={this.handleChange("goal9")}
                  margin="normal"
                />

                <TextField
                  multiline
                  id="obj 9_1"
                  label="Objective 9_1"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj9_1}
                  onChange={this.handleChange("obj9_1")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 9_2"
                  label="Objective 9_2"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj9_2}
                  onChange={this.handleChange("obj9_2")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 9_3"
                  label="Objective 9_3"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj9_3}
                  onChange={this.handleChange("obj9_3")}
                  margin="normal"
                />
                <Container>
                  <FormGroup className={classes.checkBoxPadding} row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.addGoal10}
                          onChange={this.handleAdd10thGoal("addGoal10")}
                          classes={{
                            root: classes.checkedRoot,
                            checked: classes.checked
                          }}
                          value={this.state.addGoal10}
                        />
                      }
                      label="Add additional goal"
                    />
                  </FormGroup>
                </Container>
              </Grid>
            ) : null}

            {this.state.addGoal10 ? (
              <Grid container direction="column">
                <MuiThemeProvider theme={theme}>
                  <FormGroup row>
                    <FormControlLabel
                      className={classes.marg}
                      control={
                        <Switch
                          checked={this.state.activeGoal10}
                          onChange={this.handleGoalActive("activeGoal10")}
                          value={this.state.activeGoal10}
                          color="primary"
                        />
                      }
                      label="Active Goal"
                    />
                  </FormGroup>
                </MuiThemeProvider>
                <TextField
                  required
                  multiline
                  id="goal10"
                  label="Goal 10"
                  variant="outlined"
                  className={classes.textFieldGoal}
                  value={this.state.goal10}
                  onChange={this.handleChange("goal10")}
                  margin="normal"
                />

                <TextField
                  multiline
                  id="obj 10_1"
                  label="Objective 10_1"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj10_1}
                  onChange={this.handleChange("obj10_1")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 10_2"
                  label="Objective 10_2"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj10_2}
                  onChange={this.handleChange("obj10_2")}
                  margin="normal"
                />
                <TextField
                  multiline
                  id="obj 10_3"
                  label="Objective 10_3"
                  variant="outlined"
                  className={classes.textFieldObj}
                  value={this.state.obj10_3}
                  onChange={this.handleChange("obj10_3")}
                  margin="normal"
                />
              </Grid>
            ) : null}

            <Grid container justify="flex-end">
              <Button
                className={classes.saveButton}
                size="large"
                variant="contained"
                onClick={() => {
                  this
                    .onSubmit
                    /*
                    this.state.clientType,
                    this.state.clientFirstName,
                    this.state.clientLastName,
                    this.state.clientEmail,
                    this.state.clientTitle,
                    this.state.clientCurrentPassword,
                    this.state.clientConfirmPassword,
                    this.state.sessionType,
                    this.state.sessionCost,
                    this.state.sessionLegnth,
                    this.state.clientPhone,
                    this.state.clientAddress,
                    this.state.clientBday,
                    this.state.clientCity,
                    this.state.clientState,
                    this.state.clientZipCode,
                    this.state.clientStreetAddress,
                    this.state.contactNotes,
                   
                    this.state.contactFirstName,
                    this.state.contactLastName,
                    this.state.contactEmail,
                    this.state.contactTitle,
                    this.state.contactPhone,
                    this.state.contactAddress,
                    this.state.contactCity,
                    this.state.contactState,
                    this.state.contactZip,
         
                    this.state.contactFirstName2,
                    this.state.contactLastName2,
                    this.state.contactEmail2,
                    this.state.contactTitle2,
                    this.state.contactPhone2,
                    this.state.contactAddress2,
                    this.state.contactCity2,
                    this.state.contactState2,
                    this.state.contactZip2,
              
                    this.state.contactFirstName3,
                    this.state.contactLastName3,
                    this.state.contactEmail3,
                    this.state.contactTitle3,
                    this.state.contactPhone3,
                    this.state.contactAddress3,
                    this.state.contactCity3,
                    this.state.contactState3,
                    this.state.contactZip3,
               
                    this.state.billingFirstName,
                    this.state.billingLastName,
                    this.state.nameOnCard,
                    this.state.cardNum,
                    this.state.payorEmail,
                    this.state.payorTitle,
                    this.state.paymentType,
                    this.state.billingPhone,
                    this.state.billingAddress,
                    this.state.billingCity,
                    this.state.billingZip,
                    this.state.billingState,
                    this.state.cvv,
                    this.state.expDate,
                    this.state.cardType
                    */
                    ();
                }}
              >
         
                Save
    
              </Button>
            </Grid>
              </Paper>
            </form>
          )}
        </Container>
      </div>
    );
  }
}

ClientDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ClientDetails));

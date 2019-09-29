import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MailIcon from '@material-ui/icons/Mail'
import Badge from '@material-ui/core/Badge'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MonetizationOn from '@material-ui/icons/MonetizationOn'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import InsertInvitation from '@material-ui/icons/InsertInvitation'
import Mood from '@material-ui/icons/Mood'
import PeopleOutline from '@material-ui/icons/PeopleOutline'
import TitleBarHome from './titleBars/titleBarHome'
import TitleBarAccountsInv from './titleBars/titleBarAccountsInv'
import TitleBarCal from './titleBars/titleBarCalendar'
import TitleBarClientDet from './titleBars/titleBarClientDetails'
import TitleBarClientDetActive from './titleBars/titleBarClientDetailsActive'
import TitleBarClients from './titleBars/titleBarClients'
import NewTitleBarMemDet from './titleBars/titleBarNewMemberDetails'
import NewTitleBarMemDetHideInact from './titleBars/titleBarNewMemberDetailsHideInact'
import NewTitleBarClientDet from './titleBars/titleBarNewClientDetails'
import NewTitleBarClientDetHideInact from './titleBars/titleBarNewClientDetailsHideInact'
import TitleBarMemDet from './titleBars/titleBarMemberDetails'
import TitleBarMemDetAct from './titleBars/titleBarMemberDetailsActive'
import TitleBarTeamMembers from './titleBars/titleBarTeamMembers'
import AccountBalanceWallet from '@material-ui/icons/AccountBalanceWallet'
import TeamMemberActionsHideInactive from './Actions/teamMemberActionsHideInactive'
import TeamMemberActionsShowAll from './Actions/teamMemberActionsShowAll'
import AccountsInvoicesTabs from './AccountsInvoices/accountsInvoicesTabs'
import ClientActionsShowAll from './Actions/clientActionsShowAll'
import ClientActionsHideInactive from './Actions/clientActionsHideInactive'
import ClientDetails from './Client/clientDetails'
import MemberDetails from './Member/memberDetails'
import ReactCalendarBase from './Calendar/ReactCalendarBase'
import Blue from '@material-ui/core/colors/blue'
import BackEndTeamMembersTable from './Tables/backEndTeamMembersTable'
import BackEndTeamMembersTableActive from './Tables/backEndTeamMembersTableActive'
import BackEndClientsTable from './Tables/backEndClientsTable'
import BackEndClientsTableActive from './Tables/backEndClientsTableActive'
import { Switch, Link, Route } from 'react-router-dom'
import NewClient from './Client/NewClient'
import NewClientHideInac from './Client/NewClientHideInac'
import NewMember from './Member/NewMember'
import NewMemberHideInac from './Member/NewMemberHideInac'
import ReactCalendarBaseCopy from './Calendar/ReactCalendarBaseCopy'

//width of drawer
const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: Blue[800]
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1) * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },

  rightToolbar: {
    marginLeft: 'auto',
    marginRight: -12
  }
})

const navStyle = {
  color: 'black',
  textDecoration: 'none'
}
const navStyle2 = {
  color: 'white',
  textDecoration: 'none'
}

const Page404 = () => {
  return <h3>Please select a tab from the panel</h3>
}

class MainApp extends React.Component {
  state = {
    open: false,
    anchorEl: null
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes, theme } = this.props
    const { open } = this.state
    const { anchorEl } = this.state
    const isMenuOpen = Boolean(anchorEl)

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}> Settings</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Help</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Sign Out</MenuItem>{' '}
      </Menu>
    )

    return (
      <div className={classes.root}>
        <CssBaseline />

        <AppBar
          position="fixed"
          elevation={1}
          /* makes sure the apps shifts when the drawer is open */
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          {/* makes sure gutters are disabled when the drawer is not open */}
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              {/* Menu icon*/}
              <MenuIcon />
            </IconButton>
            {/* MTSaaS Name */}
            <Link style={navStyle2} to="/home">
              <Typography variant="h6" color="inherit" noWrap>
                Application
              </Typography>
            </Link>
            <div className={classes.rightToolbar}>
              <IconButton color="inherit">
                <Badge color="default">
                  <MonetizationOn />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge /* badgeContent={2} */ color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            {/* no visible change */}
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              />
            </div>
            {/*end of toolbar and Appbar */}
          </Toolbar>
          {renderMenu}
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link style={navStyle} to="/home">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link style={navStyle} to="/calendar">
              <ListItem button>
                <ListItemIcon>
                  <InsertInvitation />
                </ListItemIcon>
                <ListItemText primary="Calendar" />
              </ListItem>
            </Link>

            <Link style={navStyle} to="/clients">
              <ListItem button>
                <ListItemIcon>
                  <Mood />
                </ListItemIcon>
                <ListItemText primary="Clients" />
              </ListItem>
            </Link>
            <Link style={navStyle} to="/teammembers">
              <ListItem button>
                <ListItemIcon>
                  <PeopleOutline />
                </ListItemIcon>
                <ListItemText primary="Team Members" />
              </ListItem>
            </Link>
            <Link style={navStyle} to="/accountsandinv">
              <ListItem button>
                <ListItemIcon>
                  <AccountBalanceWallet />
                </ListItemIcon>
                <ListItemText primary="Acounts & Invoices" />
              </ListItem>
            </Link>
          </List>
        </Drawer>

        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          {/* creates header space in between the body text and the top nav*/}
          <div className={classes.drawerHeader} />

          <Switch>
            <Route
              exact
              path="/home"
              render={() => (
                <div>
                  <TitleBarHome />
                </div>
              )}
            />
            <Route
              exact
              path="/calendar"
              render={() => (
                <div>
                  <TitleBarCal />
                  <ReactCalendarBase />
                </div>
              )}
            />
            <Route
              exact
              path="/calendar/n"
              render={() => (
                <div>
                  <TitleBarCal />
                  <ReactCalendarBaseCopy />
                </div>
              )}
            />

            <Route
              exact
              path="/clients"
              render={() => (
                <div>
                  <TitleBarClients />
                  <ClientActionsHideInactive />
                  <BackEndClientsTable />
                </div>
              )}
            />

            <Route
              exact
              path="/clients/hideinactive"
              render={() => (
                <div>
                  <TitleBarClients />
                  <ClientActionsShowAll />
                  <BackEndClientsTableActive />
                </div>
              )}
            />

            <Route
              exact
              path="/clients/details"
              render={() => (
                <div>
                  <TitleBarClientDet />
                  <ClientDetails />
                </div>
              )}
            />

            <Route
              exact
              path="/clients/hideinactive/details"
              render={() => (
                <div>
                  <TitleBarClientDetActive />
                  <ClientDetails />
                </div>
              )}
            />

            <Route
              exact
              path="/clients/newclient"
              render={() => (
                <div>
                  <NewTitleBarClientDet />
                  <NewClient />
                </div>
              )}
            />

            <Route
              exact
              path="/clients/hideinactive/newclient"
              render={() => (
                <div>
                  <NewTitleBarClientDetHideInact />
                  <NewClientHideInac />
                </div>
              )}
            />

            <Route
              exact
              path="/teammembers"
              render={() => (
                <div>
                  <TitleBarTeamMembers />
                  <TeamMemberActionsHideInactive />
                  <BackEndTeamMembersTable />
                </div>
              )}
            />

            <Route
              exact
              path="/teammembers/hideinactive"
              render={() => (
                <div>
                  <TitleBarTeamMembers />
                  <TeamMemberActionsShowAll />
                  <BackEndTeamMembersTableActive />
                </div>
              )}
            />

            <Route
              exact
              path="/teammembers/newmember"
              render={() => (
                <div>
                  <NewTitleBarMemDet />
                  <NewMember />
                </div>
              )}
            />

            <Route
              exact
              path="/teammembers/hideinactive/newmember"
              render={() => (
                <div>
                  <NewTitleBarMemDetHideInact />
                  <NewMemberHideInac />
                </div>
              )}
            />

            <Route
              exact
              path="/teammembers/details"
              render={() => (
                <div>
                  <TitleBarMemDet />
                  <MemberDetails />
                </div>
              )}
            />

            {/* <Route
              exact
              path="/teammembers/hideinactive/details"
              render={() => (
                <div>
                  <TitleBarMemDetAct />
                  <MemberDetails />
                </div>
              )}
            /> */}

            <Route
              exact
              path="/accountsandinv"
              render={() => (
                <div>
                  <TitleBarAccountsInv />
                  <AccountsInvoicesTabs />
                </div>
              )}
            />

            <Route
              render={() => (
                <div>
                  <Page404 />
                </div>
              )}
            />
          </Switch>
        </main>
      </div>
    )
  }
}
/* no visible changes */
MainApp.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(MainApp)

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import PleaseWork from "../teamMember/PleaseWork";
import PleaseWork2 from "../teamMember/PleaseWork2";
import AccountsActions from "../AccountsInvoices/accountsActionsOld";
import AssignedClientsTable from "../Tables/assignedClientsTable";
import AccountsTable from "../Old/accountsTableOLD";
import TransactionsTable from "../Tables/transactionsTable";
import TransactionsActions from "../Actions/transactionsActionsOld";
import InvoiceActions from "../Actions/invoiceActionsOld";
import InvoicesTable from "../Tables/invoicesTable";
import DocumentationTable from "../Old/noteTemplatesTableOLD";
import TemplatesActions from "../Old/noteTemplatesActionsOLD";
import TemplatesTable from "../Old/noteTemplatesTableOLD";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 24 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    //flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1) * 5,
    marginLeft: theme.spacing(1) * 55,
    marginRight: theme.spacing(1) * 55,
    width: 500
  }
});
class SimpleTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Templates" />
            <Tab label="History" />
            <Tab label="Settings" />
          </Tabs>
        </AppBar>

        {value === 0 && <TemplatesActions />}
        {value === 0 && <TemplatesTable />}
        {value === 1 && "History"}
        {value === 2 && "Settings"}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTabs);

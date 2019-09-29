import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountsActions from "./accountsActions";
import Container from "@material-ui/core/Container";
import TransactionsActions from "../Actions/transactionsActions";
import InvoiceActions from "../Actions/invoiceActions";
import InvoicesTablev3 from "../Tables/invoicesTablev3";
import Blue from "@material-ui/core/colors/blue";
import AccountsTablev3 from "../Tables/accountsTablev3";
import TransactionsTablev3 from "../Tables/transactionsTablev3";

const styles = theme => ({
  root: {
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(5),
    backgroundColor: Blue[800]
    //fontSize: "17"
  }
});
class AccountsInvoicesTabs extends React.Component {
  state = {
    value: 0
  };

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <Container maxWidth="sm">
          <AppBar className={classes.root} position="static">
            <Tabs
              indicatorColor="none"
              value={value}
              onChange={this.handleChangeTab}
              fontSize="17"
            >
              <Tab label="Accounts" />
              <Tab label="Transactions" />
              <Tab label="Invoices" />
            </Tabs>
          </AppBar>
        </Container>

        {value === 0 && <AccountsActions />}
        {/* {value === 0 && <AccountsTablev3 />} */}
        {value === 1 && <TransactionsActions />}
        {value === 1 && <TransactionsTablev3 />}
        {value === 2 && <InvoiceActions />}
        {value === 2 && <InvoicesTablev3 />}
      </div>
    );
  }
}

AccountsInvoicesTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountsInvoicesTabs);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Cyan from "@material-ui/core/colors/cyan";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: Cyan[800],
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    //the width might have to change to actual number
    width: "390",
    marginTop: theme.spacing(1) * 5,
    //marginLeft: theme.spacing(1) * 30,
    marginBottom: theme.spacing(1) * 10,
    overflowX: "auto"
  },
  state: {
    // open: false,
    //openV: false
  },

  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

let id = 0;
function createData(fileName, fileUploadDate, fileDescription) {
  id += 1;
  return { id, fileName, fileUploadDate, fileDescription };
}

const rows = [
  createData("File 1", "2/1/16", "First file"),
  createData("File 2", "2/11/16", "Second file"),
  createData("File 3", "3/29/16", "Third file"),
  createData("File 4", "4/18/16", "Fourth file")
];

class TeamMemFilesTable extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell align="center">File Name</CustomTableCell>
              <CustomTableCell align="center">Upload Date</CustomTableCell>
              <CustomTableCell align="center">Description</CustomTableCell>
              <CustomTableCell align="center">Session Type</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow hover className={classes.row} key={row.id}>
                <CustomTableCell align="center">{row.fileName}</CustomTableCell>
                <CustomTableCell align="center">
                  {row.fileUploadDate}
                </CustomTableCell>
                <CustomTableCell align="center">
                  {row.fileDescription}
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

TeamMemFilesTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamMemFilesTable);

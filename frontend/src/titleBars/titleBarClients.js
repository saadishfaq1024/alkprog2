import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    //paddingTop: theme.spacing(1),
    //paddingBottom: theme.spacing(1)
    padding: theme.spacing(1, 1),
    marginLeft: theme.spacing(-3),
    marginRight: theme.spacing(-3),
    marginTop: theme.spacing(-2.9)
  },

  root2: {
    marginTop: theme.spacing(2)
  },

  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function PaperSheet() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root} elevation={2}>
        <Typography align="center" variant="h5">
          Clients
        </Typography>
      </Paper>
    </div>
  );
}

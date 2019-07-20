import React from "react";
import { AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    height: "60px",
    width: "100%"
  }
});

export const AppHeader = () => {
  const classes = useStyles();
  return <AppBar className={classes.root} position="static" />;
};

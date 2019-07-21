import React, { Component } from "react";
import { AppBar } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Add } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { DialogComponent } from "./DialogComponent";

const useStyles = {
  root: {
    height: "60px",
    width: "100%"
  }
};

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      listName: ""
    };
  }

  handleClick = () => {
    this.setState({
      dialogOpen: true
    });
  };

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    });
  };

  handleCreate = () => {
    const { listName } = this.state;
    const id = `${this.state.listName.replace(/\s/g, "")}-${this.rand()}`;
    const listObj = {
      listName,
      id
    };
    this.handleDialogClose();
    this.props.addLists([...this.props.allLists, listObj]);
  };

  handleTextFieldChange = event => {
    this.setState({
      listName: event.target.value
    });
  };

  rand = () => {
    return Math.round(Math.random() * 20);
  };

  render() {
    const { classes } = this.props;
    const { dialogOpen } = this.state;

    return (
      <AppBar className={classes.root} position="static">
        <IconButton onClick={this.handleClick}>
          <Add />
        </IconButton>
        <DialogComponent
          open={dialogOpen}
          title="Enter List Name"
          buttonActionLabel="Create"
          handleClose={this.handleDialogClose}
          handleTextFieldChange={e => this.handleTextFieldChange(e)}
          handleCreate={this.handleCreate}
          textValue={this.state.listName}
        />
      </AppBar>
    );
  }
}

export default withStyles(useStyles)(AppHeader);

import React, { Component } from "react";
import { AppBar } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Add } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { DialogComponent } from "./DialogComponent";
import Button from "@material-ui/core/Button";
import {ReactComponent as Github} from '../utils/github.svg';
import {ReactComponent as Linkedin} from '../utils/linkedin.svg';
import {ReactComponent as Twitter} from '../utils/twitter.svg';
import {ReactComponent as CodeSandBox} from '../utils/codesandbox.svg'; 
import "../styles/appHeader.scss";

const useStyles = {
  root: {
    height: "60px",
    width: "100%",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
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
      <div>
      <a href="https://github.com/harinarayanan-gooner" target="_blank">
        <Github className="svg-class"/>
        </a>
      <a href="https://www.linkedin.com/in/hari-narayanan-44847011b/" target="_blank">
        <Linkedin className="svg-class"/>
      </a>
      <a href="https://twitter.com/harithegooner" target="_blank">
        <Twitter className="svg-class"/>
      </a>
      <a href="https://codesandbox.io/u/harinarayanan-gooner" target="_blank">
        <CodeSandBox className="svg-class"/>
      </a>
      </div>
      <span>
        Trello-Clone
      </span>
       <div>
       <Button onClick={this.handleClick}>
          <Add style={{marginRight:"5px"}}/>
          Create New List
        </Button>
       </div>
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

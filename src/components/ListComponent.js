import React, { Component } from "react";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/styles";
import { ListItem, ListItemText } from "@material-ui/core";
import { CardComponent } from "./CardComponent";
import { IconMenuRenderer } from "./IconMenuRenderer";
import { DialogComponent } from "./DialogComponent";

const useStyles = {
  listRoot: {
    maxHeight: "800px",
    width: "320px",
    backgroundColor: "#e8e8e8",
    margin: "20px",
    borderRadius: "5px",
    padding: "10px",
    overflowY: "auto"
  }
};

const options = [
  {
    label: "Add List",
    type: "add"
  },
  {
    label: "Delete List",
    type: "delete"
  }
];

class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      listName: "",
      modalOpen: false,
      menuClickType: ""
    };
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleMenuSelect = type => {
    this.setState({
      modalOpen: true,
      menuClickType: type
    });
  };

  handleDialogClose = () => {
    this.setState(
      {
        modalOpen: false
      },
      this.handleClose()
    );
  };

  handleTextFieldChange = event => {
    this.setState({
      listName: event.target.value
    });
  };

  rand = () => {
    return Math.round(Math.random() * 20);
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

  handleDelete = listTobeDeleted => {
    const filteredList = this.props.allLists.filter(list => {
      return list.id !== listTobeDeleted;
    });
    this.handleDialogClose();
    this.props.addLists([...filteredList]);
  };

  render() {
    const { classes, list } = this.props;
    const { anchorEl, modalOpen, listName, menuClickType } = this.state;
    return (
      <div>
        <List className={classes.listRoot}>
          <ListItem style={{ paddingRight: "0px" }}>
            <ListItemText>{list.listName}</ListItemText>
            <IconMenuRenderer
              options={options}
              anchorEl={anchorEl}
              handleClick={this.handleClick}
              handleClose={this.handleClose}
              handleMenuSelect={this.handleMenuSelect}
            />
          </ListItem>
          <CardComponent />
          <CardComponent />
        </List>
        <DialogComponent
          open={modalOpen}
          title={menuClickType === "add" ? "Enter List Name" : "Are you sure?"}
          handleClose={this.handleDialogClose}
          handleTextFieldChange={this.handleTextFieldChange}
          handleCreate={
            menuClickType === "add" ? this.handleCreate : () => this.handleDelete(list.id)
          }
          textValue={listName}
          buttonActionLabel={menuClickType === "add" ? "Create" : "Delete"}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(ListComponent);

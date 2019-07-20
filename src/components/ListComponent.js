import React, { Component } from "react";
import List from "@material-ui/core/List";
import { CardComponent } from "./CardComponent";
import { withStyles } from "@material-ui/styles";
import { ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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

const options = ["Add Card", "Delete Card", "Add List", "Delete List"];
const ITEM_HEIGHT = 48;

class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
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

  iconMenuRenderer = () => {
    const open = Boolean(this.state.anchorEl);
    return (
      <ListItemSecondaryAction>
        <IconButton
          aria-label="More"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={open}
          onClose={this.handleClose}
          transformOrigin={{
            horizontal: "left",
            vertical: "top"
          }}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          {options.map(option => (
            <MenuItem key={option} onClick={this.handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </ListItemSecondaryAction>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <List className={classes.listRoot}>
          <ListItem style={{ paddingRight: "0px" }}>
            <ListItemText>List_1</ListItemText>
            {this.iconMenuRenderer()}
          </ListItem>
          <CardComponent />
          <CardComponent />
        </List>
      </div>
    );
  }
}

export default withStyles(useStyles)(ListComponent);

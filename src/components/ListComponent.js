import React, { Component } from "react";
import List from "@material-ui/core/List";
import { ListItem, ListItemText } from "@material-ui/core";
import { IconMenuRenderer } from "./IconMenuRenderer";
import { DialogComponent } from "./DialogComponent";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { Add } from "@material-ui/icons";
import CardModal from "./CardModal";
import CardContainer from "../containers/CardContainer";
import { Droppable } from "react-beautiful-dnd";
import { options, rand } from "../utils";

const style = {
  listRoot: {
    maxHeight: "800px",
    width: "320px",
    backgroundColor: "#e8e8e8",
    margin: "20px",
    borderRadius: "5px",
    padding: "10px",
    overflowY: "auto"
  },
  listButtonBase: {
    display: "flex",
    textAlign: "initial",
    alignItems: "end",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: "15px"
  },
  svgIconRoot: {
    marginRight: "15px"
  }
};

class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      listName: "",
      modalOpen: false,
      menuClickType: "",
      cardModalOpen: false
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

  handleCardModalOpen = () => {
    this.setState({
      cardModalOpen: true
    });
  };

  handleCardModalClose = () => {
    this.setState({
      cardModalOpen: false
    });
  };

  handleCreate = () => {
    const { listName } = this.state;
    const id = `${this.state.listName.replace(/\s/g, "")}-${rand()}`;
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
    const { list, addCards, allCards } = this.props;
    const { anchorEl, modalOpen, listName, menuClickType, cardModalOpen } = this.state;
    return (
      <Droppable droppableId={list.id}>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <List style={style.listRoot}>
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
              <CardContainer listId={list.id} />
              <ButtonBase style={style.listButtonBase} onClick={this.handleCardModalOpen}>
                <Add style={style.svgIconRoot} />
                <Typography color="textSecondary" gutterBottom>
                  Add Card
                </Typography>
              </ButtonBase>
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
            <CardModal
              open={cardModalOpen}
              handleCardModalClose={this.handleCardModalClose}
              listId={list.id}
              addCards={addCards}
              allCards={allCards}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default ListComponent;

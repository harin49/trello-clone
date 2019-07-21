import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const DialogComponent = props => {
  const {
    open,
    title,
    handleClose,
    handleTextFieldChange,
    handleCreate,
    textValue,
    buttonActionLabel
  } = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {buttonActionLabel === "Create" ? (
          <TextField
            autoFocus
            margin="dense"
            id="listName"
            name={textValue}
            type="text"
            fullWidth
            onChange={event => handleTextFieldChange(event)}
          />
        ) : (
          ""
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => handleCreate()} color="primary">
          {buttonActionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

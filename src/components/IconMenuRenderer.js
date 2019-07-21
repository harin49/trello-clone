import React from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const ITEM_HEIGHT = 48;

export const IconMenuRenderer = props => {
  const { anchorEl, handleClick, handleClose, handleMenuSelect, options } = props;
  const open = Boolean(anchorEl);
  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
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
          <MenuItem key={option.label} onClick={() => handleMenuSelect(option.type)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

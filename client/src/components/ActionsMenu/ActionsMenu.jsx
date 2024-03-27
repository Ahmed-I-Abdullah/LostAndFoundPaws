import React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const UserMenu = ({ anchorEl, open, handleClose }) => {
  const navigate = useNavigate();

  const handleMyPostsAndComments = () => {
    navigate("/myPostsAndComments");
    handleClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Edit" />
        {/*TODO Add sign in/sign out functionality*/}
      </MenuItem>
      <Divider></Divider>
      <MenuItem>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Delete" />
        {/*TODO Add view post/comment functionality*/}
      </MenuItem>
      <Divider></Divider>
      <MenuItem>
        <ListItemIcon>
          <CheckIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Mark as resolved" />
        {/*TODO Add view post/comment functionality*/}
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;

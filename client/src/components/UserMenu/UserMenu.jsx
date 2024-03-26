import React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import PostsIcon from "@mui/icons-material/Comment";
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
          <Settings fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="My Account" />
        {/*TODO Add sign in/sign out functionality*/}
      </MenuItem>
      <MenuItem onClick={handleMyPostsAndComments}>
        <ListItemIcon>
          <PostsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="My Posts/Comments" />
        {/*TODO Add view post/comment functionality*/}
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>
        <Button variant="text" fullWidth>
          Sign Out
        </Button>
        {/*TODO Add sign out functionality*/}
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;

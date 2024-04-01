import React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { signOut  } from "aws-amplify/auth";
import { useUser } from '../../context/UserContext';
import Settings from "@mui/icons-material/Settings";
import PostsIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ anchorEl, open, handleClose }) => {

  const { assessUserState } = useUser();

  const navigate = useNavigate();

  const handleMyPostsAndComments = () => {
    navigate("/myPostsAndComments");
    handleClose();
  };

  const handleMyAccount = () => {
    navigate("/myAccount");
    handleClose();
  };

  const logoutUser = async () => {
    try {
      console.log("attempt logout");
      await signOut();
      await assessUserState();
    } catch (error) {
      console.log('error signing out: ', error);
    }
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
      <MenuItem onClick={handleMyAccount}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="My Account" />
      </MenuItem>
      <MenuItem onClick={handleMyPostsAndComments}>
        <ListItemIcon>
          <PostsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="My Posts/Comments" />
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>
        <Button variant="text" onClick={logoutUser} fullWidth> Log Out </Button>
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;

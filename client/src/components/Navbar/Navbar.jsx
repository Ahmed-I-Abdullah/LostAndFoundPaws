import React, { useState } from 'react';
import UserMenu from '../UserMenu/UserMenu';
import "./Navbar.css";
import "../../sharedStyles/SharedStyles.css";
import { Link } from "react-router-dom";
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PawLogo from '../../sharedStyles/PawLogo.png';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fakeLogin = true;

  return (
    <div className="navbar">
      <div className="navbarLeft">
      <Link to="/" className="logo">
        <img src= {PawLogo} alt="Logo" />
        <span>LostAndFoundPaws</span>
      </Link>
      </div>
      <div className="navbarRight">
        <div className="userActionSection">
          <Button variant="outlined" href="createSighting" sx={{whiteSpace: 'nowrap'}}>Report Sighting</Button>
          <Button variant="contained" href="createPost" sx={{whiteSpace: 'nowrap'}}>Report Pet</Button>
        </div>
        <div className="userSection">
          {/* TODO ADD VALID CHECKS FOR WHETHER USER IS LOGGED IN/ADMIN */}
          {fakeLogin ? (
            <>
              <div className="userMenuSection" onClick={handleMenu} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <span className="username">{"fakeUsername"}</span>
                  <AccountCircleIcon sx={{ fontSize: '40px' }} />
              </div>
              <UserMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
            </>
          ) : (
            <Button variant="outlined" href="#login" sx={{whiteSpace: 'nowrap'}}>Login</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
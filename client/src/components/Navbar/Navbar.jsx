import React, { useState } from 'react';
import { useMobile } from '../../MobileContext';
import UserMenu from '../UserMenu/UserMenu';
import "./Navbar.css";
import "../../sharedStyles/SharedStyles.css";
import { Link } from "react-router-dom";
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
  const isAdmin = false;

  const { isMobile, isMobileSmall } = useMobile();

  return (
    <div className="navbar">
      <div className="navbarLeft">
      <Link to="/" className="logo">
        <img src= {PawLogo} alt="Logo" />
        {!isMobileSmall && <span>LostAndFoundPaws</span>}
      </Link>
      </div>
      <div className="navbarRight">
        {!isMobile && <div className="userActionSection">
          {/* ADMIN VARIABLE VIEW REPORTINGS BUTTON */}
          {isAdmin ? (  <Button variant="contained" href="createSighting">View Reportings</Button> ) :
          ( <div><Button variant="outlined" href="createSighting">Report Sighting</Button>
            <Button variant="contained" href="createPost">Report Pet</Button> </div>)
          }
        </div>}
        <div className="userSection">
          {/* TODO ADD VALID CHECKS FOR WHETHER USER IS LOGGED IN/ADMIN */}
          {fakeLogin ? (
            <>
              <Button variant="outlined" href="login">Temp Login</Button>
              <div className="userMenuSection" onClick={handleMenu} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  {!isMobile && (<span className="username">{"fakeUsername"}</span>)} 
                  <AccountCircleIcon sx={{ fontSize: '40px' }} />
              </div>
              <UserMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
            </>
          ) : (
            <Button variant="outlined" href="login">Log In</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
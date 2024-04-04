import React, { useState, useEffect } from 'react';
import { useMobile } from '../../context/MobileContext';
import { useUser } from '../../context/UserContext';
import { generateClient } from 'aws-amplify/api';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../UserMenu/UserMenu';
import "./Navbar.css";
import "../../sharedStyles/SharedStyles.css";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PawLogo from '../../sharedStyles/PawLogo.png';

const client = generateClient({authMode: 'userPool'});

const Navbar = () => {  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const { isMobile, isMobileSmall } = useMobile();
  const { userState, username } = useUser();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <div className="navbarLeft">
      <Link to="/" className="logo">
        <img src= {PawLogo} alt="Logo" />
        {!isMobileSmall && <span>LostAndFoundPaws</span>}
      </Link>
      </div>
      <div className="navbarRight">
        {userState != "Guest" ? (<>
          {!isMobile && <div>
            {userState == "Admin" ? (
              <div className="userActionSection"> 
                <Button variant="contained" onClick={() => navigate("/viewReportings")}>View Reportings</Button>
              </div> 
            ) :
            ( 
              <div className="userActionSection">
                <Button variant="outlined" onClick={() => navigate("/createSighting")}>Report Sighting</Button>
                <Button variant="contained" onClick={() => navigate("/createPost")}>Report Pet</Button>
              </div>
            )}
          </div>}
          <div className="userSection">
            <div onClick={handleMenu} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                {!isMobile && (<span className="username">{username}</span>)} 
                <AccountCircleIcon sx={{ fontSize: '40px' }} />
            </div>
            <UserMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
          </div>
        </>) : (
            <Button variant="outlined" href="login">Log In</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
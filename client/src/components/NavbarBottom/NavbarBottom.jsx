import React from 'react';
import Button from '@mui/material/Button';
import { useMobile } from '../../MobileContext';
import './NavbarBottom.css';

const NavbarBottom = () => {
  const { isMobile } = useMobile();
  const isAdmin = false;

  if (!isMobile) {
    return null;
  }

  return (
    <div className="navbarBottom">
      {isAdmin ? 
      (<Button variant="contained" href="createSighting">View Reportings</Button> ) :
      (<div> 
        <Button variant="outlined" href="createSighting">Report Sighting</Button>
        <Button variant="contained" href="createPost">Report Pet</Button>
        </div>)
      }
    </div>
  );
};

export default NavbarBottom;
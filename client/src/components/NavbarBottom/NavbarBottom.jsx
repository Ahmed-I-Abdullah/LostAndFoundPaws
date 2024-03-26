import React from 'react';
import Button from '@mui/material/Button';
import { useMobile } from '../../MobileContext';
import './NavbarBottom.css';

const NavbarBottom = () => {
  const { isMobile } = useMobile();

  if (!isMobile) {
    return null;
  }

  return (
    <div className="navbarBottom">
      <Button variant="outlined" href="createSighting">Report Sighting</Button>
      <Button variant="contained" href="createPost">Report Pet</Button>
    </div>
  );
};

export default NavbarBottom;
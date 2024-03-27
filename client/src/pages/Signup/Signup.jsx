import React from 'react';
import { useMobile } from '../../MobileContext';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "../../sharedStyles/SharedStyles.css";
import './Signup.css'
import PawLogo from '../../sharedStyles/PawLogo.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Signup = () => {
  const { isMobile } = useMobile();

  return (
    <div className={`${isMobile ? 'signup-wrapper-mobile' : 'signup-wrapper'}`}>
      <div className={`${isMobile ? 'signup-container-mobile' : 'signup-container'}`}>
        <div className="close-button">
          <IconButton href="./" aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
        <div className="signup-header">
          <div className="logo">
            <img src={PawLogo} alt="Logo" />
            <span>LostAndFoundPaws</span>
          </div>
          <h1>Sign Up</h1>
          <div className="divider"></div>
        </div>
        <form>
          <div className="signup-form-component">
            <TextField label="Username" variant="outlined" fullWidth />
          </div>
          <div className="signup-form-component">
            <TextField label="Email" variant="outlined" fullWidth />
          </div>
          <div className="signup-form-component">
            <TextField label="Password" variant="outlined" type="password" fullWidth />
          </div>
          <div className="signup-form-component">
            <TextField label="Confirm Password" variant="outlined" type="password" fullWidth />
          </div>
          <div className="signup-form-component-with-optional-text">
            <div className="optional-text">Optional</div>
            <TextField label="Phone Number" variant="outlined" type="password" fullWidth />
          </div>
          <div className="signup-form-component">
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </div>
        </form>
        <div className="login-link-container">
          <span>Already have an account? <Link to="/login" className="login-link">Log In</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Signup;

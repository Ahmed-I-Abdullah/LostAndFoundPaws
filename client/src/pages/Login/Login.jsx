import React from 'react';
import { useMobile } from '../../MobileContext';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "../../sharedStyles/SharedStyles.css";
import './Login.css'
import PawLogo from '../../sharedStyles/PawLogo.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Login = () => {
  const { isMobile } = useMobile();

  return (
    <div className={`${isMobile ? 'login-wrapper-mobile' : 'login-wrapper'}`}>
      <div className={`${isMobile ? 'login-container-mobile' : 'login-container'}`}>
        <div className="close-button">
          <IconButton href="./" aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
        <div className="login-header">
          <div className="logo">
            <img src={PawLogo} alt="Logo" />
            <span>LostAndFoundPaws</span>
          </div>
          <h1>Log In</h1>
          <div className="divider"></div>
        </div>
        <form>
          <div className="login-form-component">
            <TextField label="Email or Username" variant="outlined" fullWidth />
          </div>
          <div className="login-form-component">
            <TextField label="Password" variant="outlined" type="password" fullWidth />
            <Link to="/resetPassword" className="forgot-password-link">Forgot Password?</Link>
          </div>
          <div className="login-form-component">
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </div>
        </form>
        <div className="signup-link-container">
          <span>Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
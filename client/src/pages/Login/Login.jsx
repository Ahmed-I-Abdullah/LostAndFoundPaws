import React from 'react';
import { useMobile } from '../../MobileContext';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "../../sharedStyles/SharedStyles.css";
import PawLogo from '../../sharedStyles/PawLogo.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Login = () => {
  const { isMobile } = useMobile();

  return (
    <div className={`${isMobile ? 'account-wrapper-mobile' : 'account-wrapper'}`}>
      <div className={`${isMobile ? 'account-container-mobile' : 'account-container'}`}>
        <div className="close-button">
          <IconButton href="./" aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
        <div className="account-header">
          <div className="logo">
            <img src={PawLogo} alt="Logo" />
            <span>LostAndFoundPaws</span>
          </div>
          <h1>Log In</h1>
          <div className="divider"></div>
        </div>
        <form>
          <div className="account-form-component">
            <TextField label="Email or Username" variant="outlined" fullWidth />
          </div>
          <div className="account-form-component">
            <TextField label="Password" variant="outlined" type="password" fullWidth />
            <Link to="/forgetPassword" className="forgot-password-link">Forgot Password?</Link>
          </div>
          <div className="account-form-component">
            <Button type="submit" variant="contained" color="primary">
              Log In
            </Button>
          </div>
        </form>
        <div className="account-link-container">
          <span>Don't have an account? <Link to="/signup" className="account-link">Sign up</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
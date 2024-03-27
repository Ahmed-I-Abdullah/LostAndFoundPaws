import React from 'react';
import { useMobile } from '../../MobileContext';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "../../sharedStyles/SharedStyles.css";
import PawLogo from '../../sharedStyles/PawLogo.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ForgetPassword = () => {
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
          <h1>Forget Password</h1>
          <div className="divider"></div>
        </div>
        <form>
          <div className="account-form-component">
            Enter the email associated with your account
          </div>
          <div className="account-form-component">
            <TextField label="Email" variant="outlined" fullWidth />
          </div>
          <div className="account-form-component">
          <Button component={Link} to="/resetPassword" variant="contained" color="primary">
            Continue
          </Button>
          </div>
        </form>
        <div className="account-link-container">
          <span>Already have an account? <Link to="/login" className="account-link">Log In</Link></span>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

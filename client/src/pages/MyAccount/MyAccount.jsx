import React from 'react';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import "../../sharedStyles/SharedStyles.css";
import "./MyAccount.css";
import Button from '@mui/material/Button';
import CustomTextField from "../../components/TextField/TextField";


const MyAccount = () => {
  const uploadPhotoPlaceholder = (event) => {
  };

  return (
    <div className={'my-account-wrapper'}>
      <div className={'my-account-container'}>
        <div className="close-button">
          <IconButton href="./" aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
        <div className="account-header">
          <h1>My Account</h1>
          <div className="divider"></div>
        </div>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
          <AccountCircleIcon 
            onClick={uploadPhotoPlaceholder} 
            sx={{ fontSize: 200,
              '&:hover': {cursor: 'pointer'
            }}} 
          />
          <Box sx={{ position: 'absolute', transform: 'translate(175%, 175%)', borderRadius: '50%', backgroundColor: '#f5f5f5' }}>
            <IconButton onClick={uploadPhotoPlaceholder} size="small">
              <EditIcon sx={{ fontSize: 24 }}/>
            </IconButton>
          </Box>
        </Box>



        <form>
          <div className="account-form-component">
            <CustomTextField name="newUsername" label="New Username" variant="outlined" fullWidth />
          </div>
          <div className="account-form-component">
            <CustomTextField name="newEmail" label="New Email" variant="outlined" fullWidth />
          </div>
          <div className="account-form-component">
            <CustomTextField name="newPassword" label="New Password" variant="outlined" type="password" fullWidth />
          </div>
          <div className="account-form-component">
            <CustomTextField name="confirmNewPassword" label="Confirm New Password" variant="outlined" type="password" fullWidth />
          </div>
          <div className="account-form-component-with-optional-text">
            <div className="account-optional-text">Optional</div>
            <CustomTextField name="phoneNumber" label="Phone Number" variant="outlined" fullWidth />
            <Link className="forgot-password-link">Remove Phone Number</Link>
          </div>
          <div className="account-form-component">
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;

import React, { useState } from "react";
import { useUser } from '../../context/UserContext';
import { Formik, Form } from "formik";
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../../graphql/mutations.js';
import * as Yup from "yup";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import "../../sharedStyles/SharedStyles.css";
import "./MyAccount.css";
import Button from '@mui/material/Button';
import CustomTextField from "../../components/TextField/TextField";
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";


const MyAccount = () => {
  const { assessUserState } = useUser();

  const client = generateClient({authMode: 'userPool'});

  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastSeverity, setToastSeverity] = React.useState("success");
  const [toastMessage, setToastMessage] = React.useState("");

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    newPassword: "",
    confirmNewPassword: "",
    phoneNumber: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
    phoneNumber: Yup.string().optional(),
  });

  const handleSubmit = async (values) => {
    //TODO
  };

  const handleDeleteConfirmed = () => {
    //TODO
    //Dont forget toast menu for on delete
    setOpenConfirmDelete(false);
  };

  const updatePhoto = (event) => {
    //TODO
  };

  const handleToastOpen = (severity, message) => {
    setToastSeverity(severity);
    setToastMessage(message);
    setToastOpen(true);
  };

  const handleToastClose = (event, reason) => {
    setToastOpen(false);
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
            onClick={updatePhoto} 
            sx={{ fontSize: 200,
              '&:hover': {cursor: 'pointer'
            }}} 
          />
          <Box sx={{ position: 'absolute', transform: 'translate(175%, 175%)', borderRadius: '50%', backgroundColor: '#f5f5f5' }}>
            <IconButton onClick={updatePhoto} size="small">
              <EditIcon sx={{ fontSize: 24 }}/>
            </IconButton>
          </Box>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              <div className="account-form-component">
                <CustomTextField
                  name="username"
                  label="Username"
                  variant="outlined"
                  error={errors.username && touched.username}
                  helperText={touched.username ? errors.username : ""}
                  value={values.username}
                  onChange={(event) => {
                    setFieldValue("username", event.target.value);
                  }}
                  fullWidth
                />
              </div>
              <div className="account-form-component">
                <CustomTextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  error={errors.email && touched.email}
                  helperText={touched.email ? errors.email : ""}
                  value={values.email}
                  onChange={(event) => {
                    setFieldValue("email", event.target.value);
                  }}
                  fullWidth
                />
              </div>
              <div className="account-form-component">
                <CustomTextField
                  name="newPassword"
                  label="New Password"
                  variant="outlined"
                  type="password"
                  error={errors.password && touched.password}
                  helperText={touched.password ? errors.password : ""}
                  value={values.password}
                  onChange={(event) => {
                    setFieldValue("password", event.target.value);
                  }}
                  fullWidth
                />
              </div>
              <div className="account-form-component">
                <CustomTextField
                  name="confirm New Password"
                  label="Confirm New Password"
                  variant="outlined"
                  type="password"
                  error={errors.confirmPassword && touched.confirmPassword}
                  helperText={
                    touched.confirmPassword ? errors.confirmPassword : ""
                  }
                  value={values.confirmPassword}
                  onChange={(event) => {
                    setFieldValue("confirmPassword", event.target.value);
                  }}
                  fullWidth
                />
              </div>
              <div className="account-form-component-with-optional-text">
                <div className="account-optional-text">Optional</div>
                <CustomTextField
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  value={values.phoneNumber}
                  onChange={(event) => {
                    setFieldValue("phoneNumber", event.target.value);
                  }}
                  fullWidth
                />
              </div>
              <div className="account-form-component">
                <Button type="submit" variant="contained" color="primary">
                  Update Account
                </Button>
              </div>
              <div className="account-form-component">
                <Button variant="outlined" color="secondary" onClick={() => setOpenConfirmDelete(true)}>
                  Delete Account
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ConfirmDialog
      open={openConfirmDelete}
      onClose={() => setOpenConfirmDelete(false)}
      onConfirm={handleDeleteConfirmed}
      title="Are you sure you want to delete this account?"
      isDelete={true}
      />
    </div>
  );
};

export default MyAccount;

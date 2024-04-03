import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { Formik, Form } from "formik";
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser  } from "aws-amplify/auth";
import * as queries from '../../graphql/queries.js';
import * as mutations from '../../graphql/mutations.js';
import * as Yup from "yup";
import IconButton from '@mui/material/IconButton';
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

  const [currentUsername, setCurrentUsername] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPhone, setCurrentPhone] = useState('');

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const initialValues = {
    username: currentUsername,
    email: currentEmail,
    password: '',
    confirmPassword: '',
    phoneNumber: currentPhone,
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

  const getUserInfo = async () => {
    try {
      const user = await getCurrentUser();
      const result = await client.graphql({
        query: queries.getUser,
        variables: { id: user.userId }
      })
      setCurrentUsername(result.data.getUser.username ?? '');
      setCurrentEmail(result.data.getUser.email ?? '');
      setCurrentPhone(result.data.getUser.phone ?? '');
    } catch (error) {
      console.log("Error fetching username:", error);
      setCurrentUsername('');
      setCurrentEmail('');
      setCurrentPhone('');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
          enableReinitialize={true} //To reload when fetch initial values from api
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
                  name="password"
                  label="Password"
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
                  name="confirmPassword"
                  label="Confirm Password"
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

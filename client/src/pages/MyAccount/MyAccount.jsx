import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../../context/UserContext';
import { Formik, Form } from "formik";
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, updateUserAttributes, resetPassword, deleteUser, signOut } from "aws-amplify/auth";
import { uploadData } from "@aws-amplify/storage";
import * as queries from '../../graphql/queries.js';
import * as mutations from '../../graphql/mutations.js';
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
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
import ImageUploadOnly from "../../components/ImageUploadOnly/ImageUploadOnly";


const MyAccount = () => {

  const imageUploadRef = useRef();

  const { updateUsername, assessUserState } = useUser();
  const navigate = useNavigate();

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
    phoneNumber: currentPhone,
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
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

  //For updating account
  const handleSubmit = async (values) => {

    //Update database
    try {
      const user = await getCurrentUser();
      const result = await client.graphql({
        query: mutations.updateUser.replaceAll("__typename", ""),
        variables: {
          input: {
            id: user.userId,
            username: values.username,
            email: values.email,
            phone: values.phoneNumber
          }
        },
      });
      await updateUsername();
      if(values.email == currentEmail){//not updating email so don't need to do the verification toast
        handleToastOpen(
          "success",
          `Updated account`
        );
        setTimeout(() => {
          setToastOpen(false);
        }, 2000);
        
      }
    } catch(error){
      console.log('error updating database:', error);
      handleToastOpen(
        "error",
        "Error updating database"
      );
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
    }

    //Update cognito email if needed
    if(values.email != currentEmail){
      try {
        const output = await updateUserAttributes({
          //Signed up with username as email but that does not matter here, just need to update the email attribute, or maybe something liek verification will break and this will be the issue
          userAttributes: {
            email: values.email,
          },
        });
        const { nextStep } = output.email;
        switch (nextStep.updateAttributeStep) {
          case 'CONFIRM_ATTRIBUTE_WITH_CODE':
            const codeDeliveryDetails = nextStep.codeDeliveryDetails;
            console.log(
              `Confirmation code was sent to ${codeDeliveryDetails?.deliveryMedium}.`
            );
            handleToastOpen(
              "success",
              `Verification code was sent to ${codeDeliveryDetails.deliveryMedium}`
            );
    
            setTimeout(() => {
              navigate("/VerifyUpdateEmail");
            }, 2000);
            break;
          case 'DONE':
            console.log(`attribute was successfully updated.`);
            handleToastOpen(
              "success", 
              "Successfully verified password"
            );
            setTimeout(() => {
              setToastOpen(false);
            }, 2000);
            break;
        }
      } catch (error) {
        console.log('Error updating email cognito, email in database and cognito may be out of sync now:', error);
        handleToastOpen(
          "error",
          "Error updating email cognito, email in database and cognito may be out of sync now"
        );
        setTimeout(() => {
          setToastOpen(false);
        }, 2000);
      }
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const output = await resetPassword({ username: currentEmail });
      const { nextStep } = output;
      switch (nextStep.resetPasswordStep) {
        case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
          const codeDeliveryDetails = nextStep.codeDeliveryDetails;
          console.log(
            `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
          );
          handleToastOpen(
            "success",
            `Verification code was sent to ${codeDeliveryDetails.deliveryMedium}`
          );
  
          setTimeout(() => {
            navigate("/VerifyUpdatePassword", { state: {  email: currentEmail,  }});
          }, 2000);
          break;
        case 'DONE':
          console.log('Successfully reset password.');
          break;
      }
    } catch (error) {
      console.log("Error updating password cognito", error);
      handleToastOpen(
        "error",
        "Error updating password cognito"
      );
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
    }
  };

  const handleDeleteConfirmed = async () => {
    setOpenConfirmDelete(false);
    try {
      const user = await getCurrentUser();
      const result = await client.graphql({
        query: mutations.deleteUser,
        variables: {
          input: {
            id: user.userId,
          },
        },
      });
    } catch (error) {
      console.log('error deleting database:', error);
      handleToastOpen(
        "error",
        "Error deleting database"
      );
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
    }
    try {
      await deleteUser();
      console.log(
        `Deleted user`
      );
      handleToastOpen(
        "success",
        `Deleted user`
      );

      setTimeout(() => {
        try {
          logoutUser();
        } catch (error) {
          console.log('Error signing out: ', error);
          handleToastOpen(
            "error",
            "Error signing out"
          );
          setTimeout(() => {
            setToastOpen(false);
          }, 2000);
        }
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log('Error deleting cognito user, user in database and cognito may be out of sync now:', error);
      handleToastOpen(
        "error",
        "Error deleting cognito user, user in database and cognito may be out of sync now"
      );
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
    };
  };

  const logoutUser = async () => {
    try {
      await signOut();
      await assessUserState();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  const handleImageUploadSuccess = async (file) => {
    console.log('File selected successfully:', file.name); //TODO DELETE THIS STATEMENT
    //Note since the uploading to S3 bucket and database are in same place, if database upload fails there will be images in the S3 bucket not linked to the database
    try {
      const user = await getCurrentUser();

      console.log(file);
      console.log(file.name)

      const imageKey = `images/${Date.now()}_${file.name}`;
      await uploadData({
        key: imageKey,
        data: file,
        options: {
          accessLevel: "guest", // Guests should be able to view the images
        },
      }).result;

      const userInput = {
        id: user.userId,
        profilePicture: imageKey,
      };

      await client.graphql({
        query: mutations.updateUser,
        variables: { input: userInput },
      });

      handleToastOpen(
        "success", 
        "Profile picture updated");
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error uploading image", error);
      handleToastOpen(
        "error", 
        "Error uploading profile picture");
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
    }
  };

  const handleImageUploadError = (error) => {
    console.log('Error selecting image:', error);
    handleToastOpen(
      "error",
      "Error selecing image"
    );
    setTimeout(() => {
      setToastOpen(false);
    }, 2000);
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
        <div>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
            <AccountCircleIcon 
              onClick={() => imageUploadRef.current.click()}
              sx={{ fontSize: 200, '&:hover': {cursor: 'pointer'}}} 
            />
            <Box sx={{ position: 'absolute', transform: 'translate(175%, 175%)', borderRadius: '50%', backgroundColor: '#f5f5f5' }}>
              <IconButton 
                onClick={() => imageUploadRef.current.click()}
                size="small"
              >
                <EditIcon sx={{ fontSize: 24 }}/>
              </IconButton>
            </Box>
            <ImageUploadOnly 
              ref={imageUploadRef} 
              onFileSelectSuccess={handleImageUploadSuccess} 
              onFileSelectError={handleImageUploadError}
            />
          </Box>
        </div>

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
                  name="phoneNumber"
                  label="Phone Number (Optional)"
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
                <span style={{ paddingTop: '2px' }}> {/*should be in css file for consistancy */}
                  Updated email but didn't verify?{" "}
                  <Link to="/verifyUpdateEmail" className="account-link">
                    Verify Now
                  </Link>
                </span>
              </div>
              <div className="account-form-component">
                <Button variant="contained" color="primary" onClick={() => handleUpdatePassword()}>
                  Update Password
                </Button>
                <span style={{ paddingTop: '2px' }}> {/*should be in css file for consistancy */}
                Updated password but didn't verify?{" "}
                  <Link to="/verifyUpdatePassword" className="account-link">
                    Verify Now
                  </Link>
                </span>
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
      <ToastNotification
        open={toastOpen}
        severity={toastSeverity}
        message={toastMessage}
        handleClose={handleToastClose}
      />
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

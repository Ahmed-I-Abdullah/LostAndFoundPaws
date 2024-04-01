import React from "react";
import { useMobile } from "../../context/MobileContext";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Formik, Form } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import "../../sharedStyles/SharedStyles.css";
import PawLogo from "../../sharedStyles/PawLogo.png";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import CustomTextField from "../../components/TextField/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmSignUp } from "aws-amplify/auth";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";

const VerifyAccount = () => {
  const { isMobile } = useMobile();
  const { assessUserState } = useUser();

  const location = useLocation();
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastSeverity, setToastSeverity] = React.useState("success");
  const [toastMessage, setToastMessage] = React.useState("");

  // These are passed in from signup when navigating to VerifyAccount
  const { email } = location.state || {};

  const initialValues = {
    email: email,
    confirmationCode: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
    confirmationCode: Yup.string().required("Confirmation code is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await confirmSignUp({ 
        username: values.email, confirmationCode: values.confirmationCode 
      });
      await assessUserState();
      handleToastOpen("success", "Account verified");
      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    } catch (error) {
      console.error("Error verifying account: ", error);
      handleToastOpen(
        "error",
        "Error verifying account"
      );
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
    }
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
    <div
      className={`${isMobile ? "account-wrapper-mobile" : "account-wrapper"}`}
    >
      <div
        className={`${
          isMobile ? "account-container-mobile" : "account-container"
        }`}
      >
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
          <h1>Verify Account</h1>
          <div className="divider"></div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              <div className="account-form-component">
                Enter your confirmation code
              </div>
              <div className="account-form-component">
                <CustomTextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={email}
                  error={errors.email && touched.email}
                  helperText={touched.email ? errors.email : ""}
                  onChange={(event) => {
                    setFieldValue("email", event.target.value);
                  }}
                  fullWidth
                />
              </div>
              <div className="account-form-component">
                <CustomTextField
                  name="confirmationCode"
                  label="Confirmation Code"
                  variant="outlined"
                  error={errors.confirmationCode && touched.confirmationCode}
                  helperText={
                    touched.confirmationCode ? errors.confirmationCode : ""
                  }
                  value={values.confirmationCode}
                  onChange={(event) => {
                    setFieldValue("confirmationCode", event.target.value);
                  }}
                  fullWidth
                />
              </div>
              <div className="account-form-component">
                <Button type="submit" variant="contained" color="primary">
                  Verify Account
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="account-link-container">
          <span>
            Already have an account?{" "}
            <Link to="/login" className="account-link">
              Log In
            </Link>
          </span>
        </div>
      </div>
      <ToastNotification
        open={toastOpen}
        severity={toastSeverity}
        message={toastMessage}
        handleClose={handleToastClose}
      />
    </div>
  );
};

export default VerifyAccount;

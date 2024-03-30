import React from "react";
import { useMobile } from "../../MobileContext";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Formik, Form } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import "../../sharedStyles/SharedStyles.css";
import PawLogo from "../../sharedStyles/PawLogo.png";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmResetPassword } from "aws-amplify/auth";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";

const ResetPassword = () => {
  const { isMobile } = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastSeverity, setToastSeverity] = React.useState("success");
  const [toastMessage, setToastMessage] = React.useState("");

  const initialValues = {
    email: "",
    confirmationCode: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email"),
    confirmationCode: Yup.string().required("Confirmation code is required"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await confirmResetPassword({
        username: location.state?.email || values.email,
        confirmationCode: values.confirmationCode,
        newPassword: values.password,
      });
      handleToastOpen("success", "Password updated successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error changing password: ", error);
      handleToastOpen(
        "error",
        "Error changing password. Please verify the code and try again"
      );
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
          <h1>Reset Password</h1>
          <div className="divider"></div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit} style={{ height: "100%" }}>
              <div className="account-form-component">
                Set your new password
              </div>
              {!location.state?.email && (
                <div className="account-form-component">
                  <TextField
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
              )}
              <div className="account-form-component">
                <TextField
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
                <TextField
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
                <TextField
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
              <div className="account-form-component">
                <Button type="submit" variant="contained" color="primary">
                  Reset Password
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

export default ResetPassword;

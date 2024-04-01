import React from "react";
import { useMobile } from "../../context/MobileContext";
import { useUser } from '../../context/UserContext';
import { Link } from "react-router-dom";
import { signIn  } from "aws-amplify/auth";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "../../sharedStyles/SharedStyles.css";
import PawLogo from "../../sharedStyles/PawLogo.png";
import Button from "@mui/material/Button";
import CustomTextField from "../../components/TextField/TextField";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";

const Login = () => {
  const navigate = useNavigate();
  const { isMobile } = useMobile();
  const { assessUserState } = useUser();

  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastSeverity, setToastSeverity] = React.useState("success");
  const [toastMessage, setToastMessage] = React.useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
    password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  });

  const handleSubmit = async (values) => {
    try {
      const username = values.email
      const password = values.password
      await signIn({ username, password }); // AWS calls email username because its dumb
      await assessUserState();
      navigate("/");
    } catch (error) {
      console.error("Error logging in: ", error);
      handleToastOpen(
        "error",
        "Error logging in"
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
          <h1>Log In</h1>
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
                <Link to="/forgotPassword" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>
              <div className="account-form-component">
                <Button type="submit" variant="contained" color="primary">
                  Log In
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="account-link-container">
          <span>
            Don't have an account?{" "}
            <Link to="/signup" className="account-link">
              Sign up
            </Link>
          </span>
          <span>
            Have an unverified account?{" "}
            <Link to="/verifyAccount" className="account-link">
              Verify Now
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

export default Login;

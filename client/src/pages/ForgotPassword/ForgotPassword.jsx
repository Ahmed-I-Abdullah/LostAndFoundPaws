import React from "react";
import { useMobile } from "../../MobileContext";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "../../sharedStyles/SharedStyles.css";
import PawLogo from "../../sharedStyles/PawLogo.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { resetPassword } from "aws-amplify/auth";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { isMobile } = useMobile();
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastSeverity, setToastSeverity] = React.useState("success");
  const [toastMessage, setToastMessage] = React.useState("");

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const output = await resetPassword({ username: values.email });
      handleResetPasswordNextSteps(output, values.email);
    } catch (error) {
      console.error("Error requesting password reset: ", error);
      handleToastOpen(
        "error",
        "Error requesting password reset. Please try again later"
      );
    }
  };

  const handleResetPasswordNextSteps = async (output, email) => {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case "CONFIRM_RESET_PASSWORD_WITH_CODE":
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        console.log(
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
        );

        handleToastOpen(
          "success",
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
        );

        setTimeout(() => {
          navigate("/resetPassword", { state: { email: email } });
        }, 2000);
        break;
      case "DONE":
        handleToastOpen("success", "Successfully reset password");
        break;
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
          <h1>Forgot Password</h1>
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
                Enter the email associated with your account
              </div>
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
              <div className="account-form-component">
                <Button type="submit" variant="contained" color="primary">
                  Continue
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

export default ForgetPassword;

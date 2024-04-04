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
import { useNavigate } from "react-router-dom";
import { confirmUserAttribute } from "aws-amplify/auth";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";

const VerifyUpdateEmail = () => {
  const { isMobile } = useMobile();
  const { assessUserState } = useUser();

  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastSeverity, setToastSeverity] = React.useState("success");
  const [toastMessage, setToastMessage] = React.useState("");

  const initialValues = {
    confirmationCode: "",
  };

  const validationSchema = Yup.object().shape({
    confirmationCode: Yup.string().required("Confirmation code is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await confirmUserAttribute({ 
        //dont actually need to provide email here just saying updating email
        userAttributeKey: "email", confirmationCode: values.confirmationCode 
      });
      handleToastOpen("success", "Email verified");
      setTimeout(() => {
        navigate("/MyAccount");
      }, 2000);
    } catch (error) {
      console.error("Error verifying email: ", error);
      handleToastOpen(
        "error",
        "Error verifying email"
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
          <h1>Verify Email Update</h1>
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
                Enter the confirmation code emailed to you
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
                  Update Email
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
    </div>
  );
};

export default VerifyUpdateEmail;

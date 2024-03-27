import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { Button, Grid, Typography } from "@mui/material";
import CustomTextField from "../../components/TextField/TextField";
import * as Yup from "yup";
import CardLayout from "../../components/CardLayout/CardLayout";
import "./ForgotPassword.css";

const ForgotPasswordPage = () => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <CardLayout title="Forgot Password" showLogoAndBackButton>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit} style={{ height: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
                minHeight: "250px",
              }}
            >
              <div>
                <Typography variant="subtitle2">
                  Enter the email associated with your account.
                </Typography>
                <CustomTextField
                  name="email"
                  variant="outlined"
                  className="textField"
                  error={errors.email && touched.email}
                  helperText={touched.email ? errors.email : ""}
                  value={values.email}
                  onChange={(event) => {
                    setFieldValue("email", event.target.value);
                  }}
                  placeholder="Email"
                />
              </div>
              <div>
                <Button type="submit" variant="contained" fullWidth>
                  Send Email
                </Button>
                <div className="navigation-text">
                  <Typography align="center" variant="body2" gutterBottom>
                    Remembered your password? <Link to="/login">Login</Link>
                  </Typography>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </CardLayout>
  );
};

export default ForgotPasswordPage;

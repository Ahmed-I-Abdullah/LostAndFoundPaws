import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { Button, Typography } from "@mui/material";
import CustomTextField from "../../components/TextField/TextField";
import * as Yup from "yup";
import CardLayout from "../../components/CardLayout/CardLayout";
import "./ForgotPassword.css";

const ForgotPasswordPage = () => {
  const initialValues = {
    email: ""
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
          <Form onSubmit={handleSubmit} style={{height: '100%'}}>
            <div className="fogort-form-container">
                <div>
              <Typography variant="subtitle2">
                Enter the email associated with you account
              </Typography>
              <CustomTextField
                name="email"
                variant="outlined"
                error={errors.email && touched.email}
                helperText={touched.email ? errors.email : ""}
                value={values.email}
                onChange={(event) => {
                  setFieldValue("email", event.target.value);
                }}
                placeholder="Email"
              />
            </div>
            </div>
            <div className="navigation-text">
              <Button type="submit" variant="contained" fullWidth>
                Send Email
              </Button>
              <Typography align="center" variant="body2" style={{marginTop: 10}}>
                Remembered your password? <Link to="/login">Login</Link>
              </Typography>
            </div>
          </Form>
        )}
      </Formik>
    </CardLayout>
  );
};

export default ForgotPasswordPage;

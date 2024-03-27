import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { Button, Typography } from "@mui/material";
import CustomTextField from "../../components/TextField/TextField";
import * as Yup from "yup";
import CardLayout from "../../components/CardLayout/CardLayout";
import "./VerifyAccount.css";

const VerifyAccountPage = () => {
  const initialValues = {
    email: "",
    verificationCode: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    verificationCode: Yup.string().required("Verification code is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <CardLayout title="Verify Account" showLogoAndBackButton>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit} style={{height: '100%'}}>
            <div className="form-container">
                <div>
              <Typography variant="subtitle2">
                Enter the your email and the code sent to your email.
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
              <CustomTextField
              style={{marginTop: 20}}
                name="verificationCode"
                variant="outlined"
                error={errors.verificationCode && touched.verificationCode}
                helperText={touched.verificationCode ? errors.verificationCode : ""}
                value={values.verificationCode}
                onChange={(event) => {
                  setFieldValue("verificationCode", event.target.value);
                }}
                placeholder="Verification Code"
              />
            </div>
            </div>
            <div className="navigation-text">
              <Button type="submit" variant="contained" fullWidth>
                Verify Account
              </Button>
              <Typography align="center" variant="body2" style={{marginTop: 10}}>
                Already Verified? <Link to="/login">Login</Link>
              </Typography>
            </div>
          </Form>
        )}
      </Formik>
    </CardLayout>
  );
};

export default VerifyAccountPage;

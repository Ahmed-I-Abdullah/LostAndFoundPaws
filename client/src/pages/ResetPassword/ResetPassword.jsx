import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { Button, Typography } from "@mui/material";
import CustomTextField from "../../components/TextField/TextField";
import * as Yup from "yup";
import CardLayout from "../../components/CardLayout/CardLayout";
import "./ResetPassword.css";

const ResetPasswordPage = () => {
  const initialValues = {
    password: "",
    confirmPassword: ""
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <CardLayout title="Reset Password" showLogoAndBackButton>
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
                Set your new password.
              </Typography>
              <CustomTextField
                name="password"
                variant="outlined"
                type="password"
                error={errors.password && touched.password}
                helperText={touched.password ? errors.password : ""}
                value={values.password}
                onChange={(event) => {
                  setFieldValue("password", event.target.value);
                }}
                placeholder="Password"
              />
              <CustomTextField
              style={{marginTop: 20}}
                name="confirmPassword"
                variant="outlined"
                type="password"
                error={errors.confirmPassword && touched.confirmPassword}
                helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                value={values.confirmPassword}
                onChange={(event) => {
                  setFieldValue("confirmPassword", event.target.value);
                }}
                placeholder="Confirm Password"
              />
            </div>
            </div>
            <div className="navigation-text">
              <Button type="submit" variant="contained" fullWidth>
                Reset Password
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

export default ResetPasswordPage;

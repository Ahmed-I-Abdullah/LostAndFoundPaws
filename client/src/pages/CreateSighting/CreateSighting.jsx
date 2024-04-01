import React from "react";
import { Container, Grid, Typography, Button, useTheme } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import CustomTextField from "../../components/TextField/TextField";
import { useMobile } from "../../MobileContext";
import AddressAutocompleteField from "../../components/AddressAutocompleteField/AddressAutocompleteField";
import "./CreateSighting.css";

const FieldTitle = ({ title }) => {
  return (
    <Typography variant="subtitle1" fontWeight="bold">
      {title}
    </Typography>
  );
};

const CreateSightingForm = () => {
  const theme = useTheme();
  const { isMobile } = useMobile();

  const handleCancel = () => {
    // TODO: Handle cancel logic
  };

  const handleSubmit = () => {
    // TODO: Handle submit logic
  };

  return (
    <Container style={{ overflowY: isMobile ? "scroll" : "hidden" }}>
      <div className="create-sighting-title">
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Create Sighting
        </Typography>
        <Typography variant="subtitle1">
          Please enter the sighting information below.
        </Typography>
      </div>
      <Formik
        initialValues={{
          location: "",
          phoneNumber: "",
          images: [],
          email: "",
        }}
        validationSchema={Yup.object().shape({
          location: Yup.object().required("Sighting location is required"),
          phoneNumber: Yup.string().optional(),
          images: Yup.array()
            .min(1, "At least one image is required")
            .required("Images are required"),
          email: Yup.string().email("Invalid email").optional(),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched, setFieldValue, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={theme.breakpoints.down("md") ? 4 : 6}>
              <Grid item container xs={12} md={6} spacing={4}>
                <Grid item xs={12}>
                  <FieldTitle title="Sighting Location" />
                  <AddressAutocompleteField
                    name="location"
                    variant="outlined"
                    className="textField"
                    error={errors.location && touched.location}
                    helperText={touched.location ? errors.location : ""}
                    value={values.location}
                    onChange={(value) => {
                      setFieldValue("location", value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldTitle title="Phone Number (Optional)" />
                  <CustomTextField
                    name="phoneNumber"
                    variant="outlined"
                    className="textField"
                    error={errors.phoneNumber && touched.phoneNumber}
                    helperText={touched.phoneNumber ? errors.phoneNumber : ""}
                    value={values.phoneNumber}
                    onChange={(event) => {
                      setFieldValue("phoneNumber", event.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} md={6} spacing={4}>
                <Grid item xs={12}>
                  <FieldTitle title="Insert Picture(s)" />
                  <ImageUpload
                    images={values.images}
                    handleImageChange={(e) => {
                      const newImages = [...values.images, ...e.target.files];
                      setFieldValue("images", newImages);
                      e.target.value = null;
                    }}
                    handleRemoveImage={(index) => {
                      const updatedImages = [...values.images];
                      updatedImages.splice(index, 1);
                      setFieldValue("images", updatedImages);
                    }}
                    error={errors.images && touched.images}
                    helperText={touched.images ? errors.images : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldTitle title="Email (Optional)" />
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
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                spacing={theme.breakpoints.down("md") ? 2 : 10}
                marginTop={isMobile ? 0 : 47}
              >
                <Grid item xs={6} md={6}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="formButton"
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="formButton"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateSightingForm;

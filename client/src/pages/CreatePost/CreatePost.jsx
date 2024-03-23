import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  useTheme,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Toggle from "../../components/Toggle/Toggle";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import CustomTextField from "../../components/TextField/TextField";
import CustomDropdown from "../../components/DropDown/DropDown";
import "./CreatePost.css";

const postTypeOptions = [
  { label: "Lost", color: "#FDC0C0" },
  { label: "Found", color: "#8DFD8D" },
];

const genderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
];

const speciesOptions = [
  { label: "Dog", value: "DOG" },
  { label: "Cat", value: "CAT" },
  { label: "Other", value: "OTHER" },
];

const FieldTitle = ({ title }) => {
  return (
    <Typography variant="subtitle1" fontWeight="bold">
      {title}
    </Typography>
  );
};

const CreatePostForm = () => {
  const theme = useTheme();

  return (
    <Container>
      <div className="header">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Create Post
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Please enter the pet information below.
        </Typography>
      </div>
      <Formik
        initialValues={{
          type: "Lost",
          name: "",
          gender: "",
          summary: "",
          description: "",
          location: "",
          species: "",
          phoneNumber: "",
          email: "",
          images: [],
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),
          gender: Yup.string().required("Gender is required"),
          summary: Yup.string().required("Summary is required"),
          description: Yup.string().required("Description is required"),
          location: Yup.string().required("Last known location is required"),
          species: Yup.string().required("Species is required"),
          phoneNumber: Yup.string().required("Phone number is required"),
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          images: Yup.array()
            .min(1, "At least one image is required")
            .required("Images are required"),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
        validateOnChange
        validateOnBlur
      >
        {({ errors, touched, handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={theme.breakpoints.down("md") ? 4 : 6}>
              <Grid item container xs={12} md={6} spacing={4}>
                <Grid item xs={12}>
                  <FieldTitle title="Status" />
                  <Toggle
                    options={postTypeOptions}
                    onToggleCallback={(index) =>
                      setFieldValue("type", postTypeOptions[index].label)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldTitle title="Name" />
                  <CustomTextField
                    name="name"
                    variant="outlined"
                    className="textField"
                    error={errors.name && touched.name}
                    helperText={errors.name}
                    value={values.name}
                    onChange={(event) => {
                      setFieldValue("name", event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldTitle title="Gender" />
                  <CustomDropdown
                    options={genderOptions}
                    className="formControl"
                    error={errors.gender && touched.gender}
                    helperText={errors.gender}
                    value={values.gender}
                    onChange={(event) => {
                      setFieldValue("gender", event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldTitle title="Summary" />
                  <CustomTextField
                    name="summary"
                    variant="outlined"
                    className="textField"
                    error={errors.summary && touched.summary}
                    helperText={errors.summary}
                    value={values.summary}
                    onChange={(event) => {
                      setFieldValue("summary", event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldTitle title="Description" />
                  <CustomTextField
                    name="description"
                    variant="outlined"
                    multiline
                    rows={4}
                    className="textField"
                    error={errors.description && touched.description}
                    helperText={errors.description}
                    value={values.description}
                    onChange={(event) => {
                      setFieldValue("description", event.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} md={6} spacing={4}>
                <Grid item xs={12}>
                  <FieldTitle title="Last Known Location" />
                  <CustomTextField
                    name="location"
                    variant="outlined"
                    className="textField"
                    error={errors.location && touched.location}
                    helperText={errors.location}
                    value={values.location}
                    onChange={(event) => {
                      setFieldValue("location", event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldTitle title="Species" />
                  <CustomDropdown
                    options={speciesOptions}
                    className="formControl"
                    error={errors.species && touched.species}
                    helperText={errors.species}
                    value={values.species}
                    onChange={(event) => {
                      setFieldValue("species", event.target.value);
                    }}
                  />
                </Grid>
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
                    helperText={errors.images}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldTitle title="Phone Number (Optional)" />
                  <CustomTextField
                    name="phoneNumber"
                    variant="outlined"
                    className="textField"
                    error={errors.phoneNumber && touched.phoneNumber}
                    helperText={errors.phoneNumber}
                    value={values.phoneNumber}
                    onChange={(event) => {
                      setFieldValue("phoneNumber", event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldTitle title="Email" />
                  <CustomTextField
                    name="email"
                    variant="outlined"
                    className="textField"
                    error={errors.email && touched.email}
                    helperText={errors.email}
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

export default CreatePostForm;

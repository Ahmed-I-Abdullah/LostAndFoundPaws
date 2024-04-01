import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  useTheme,
  Snackbar,
  MuiAlert,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { rgba } from "polished";
import Toggle from "../../components/Toggle/Toggle";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import CustomTextField from "../../components/TextField/TextField";
import CustomDropdown from "../../components/DropDown/DropDown";
import AddressAutocompleteField from "../../components/AddressAutocompleteField/AddressAutocompleteField";
import { useMobile } from "../../context/MobileContext";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import { uploadData } from "@aws-amplify/storage";
import * as mutations from "../../graphql/mutations";
import "./CreatePost.css";

const postTypeOptions = [
  { label: "Lost", color: rgba("#FDC0C0", 0.5) },
  { label: "Found", color: rgba("#8DFD8D", 0.5) },
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
  const { isMobile } = useMobile();
  const client = generateClient({ authMode: "userPool" }); //May need to update to apiKey since poster accounts are not authorized
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastSeverity, setToastSeverity] = React.useState("success");
  const [toastMessage, setToastMessage] = React.useState("");


  const handleSubmit = async (values) => {
    try {
        const user = await getCurrentUser();

        // Upload images to storage
        const imageKeys = [];
        for (const image of values.images) {
            const imageKey = `images/${Date.now()}_${image.name}`;
            await uploadData({
                key: imageKey,
                data: image,
                options: {
                    accessLevel: "guest", // Guests should be able to view the images
                },
            }).result;

            imageKeys.push(imageKey);
        }

        // Store the data in the database
        const postInput = {
            name: values.name,
            status: values.type.toUpperCase(),
            gender: values.gender,
            summary: values.summary,
            description: values.description,
            resolved: false,
            lastKnownLocation: {
                latitude: values.location.coordinates.latitude,
                longitude: values.location.coordinates.longitude,
                address: values.location.address,
            },
            species: values.species,
            userID: user.userId,
            images: imageKeys,
            contactInfo: {
                email: values.email || '',
                phone: values.phoneNumber || '' 
            }
        };

        await client.graphql({
            query: mutations.createPost,
            variables: { input: postInput },
        });

        handleToastOpen('success', 'Post created successfully');
    } catch (error) {
        console.error("Error creating post: ", error);
        handleToastOpen('error', 'Error creating post. Please try again later');
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
    <Container
      className="create-post-container"
      style={{ overflowY: isMobile ? "scroll" : "hidden", marginBottom: 50 }}
    >
      <div className="create-post-header">
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Create Post
        </Typography>
        <Typography variant="subtitle1">
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
          location: Yup.object().required("Last known location is required"),
          species: Yup.string().required("Species is required"),
          phoneNumber: Yup.string().optional(),
          email: Yup.string()
            .email("Invalid email")
            .optional(),
          images: Yup.array()
            .min(1, "At least one image is required")
            .required("Images are required"),
        })}
        onSubmit={handleSubmit}
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
                    containerWidth={"100%"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldTitle title="Name" />
                  <CustomTextField
                    name="name"
                    variant="outlined"
                    className="textField"
                    error={errors.name && touched.name}
                    helperText={touched.name ? errors.name : ""}
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
                    helperText={touched.gender ? errors.gender : ""}
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
                    helperText={touched.summary ? errors.summary : ""}
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
                    helperText={touched.description ? errors.description : ""}
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
                  <FieldTitle title="Species" />
                  <CustomDropdown
                    options={speciesOptions}
                    className="formControl"
                    error={errors.species && touched.species}
                    helperText={touched.species ? errors.species : ""}
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
                    helperText={touched.images ? errors.images : ""}
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
      <ToastNotification
        open={toastOpen}
        severity={toastSeverity}
        message={toastMessage}
        handleClose={handleToastClose}
      />
    </Container>
  );
};

export default CreatePostForm;

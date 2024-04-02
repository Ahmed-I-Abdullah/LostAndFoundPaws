import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import { uploadData } from "@aws-amplify/storage";
import { useParams } from "react-router-dom";
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm";
import CircularProgress from "@mui/material/CircularProgress";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import { downloadData } from "@aws-amplify/storage";

const EditPost = () => {
  const navigate = useNavigate();
  const client = generateClient({ authMode: "userPool" });
  const { id } = useParams();
  const [toastOpen, setToastOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [toastSeverity, setToastSeverity] = React.useState("success");
  const [toastMessage, setToastMessage] = React.useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      const postData = await client.graphql({
        query: queries.getPost,
        variables: { id },
      });

      console.log("respons is: ", postData);

      setPost(postData.data.getPost);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleToastOpen("error", "Error fetching post");
      console.error("Error fetching post: ", error);
    }
  };

  const fetchImages = async () => {
    if (post && post.images) {
      const imageUrls = post.images;
      const images = await Promise.all(
        imageUrls.map(async (imageUrl) => {
          try {
            const imageData = await downloadData({ key: imageUrl }).result;
            return imageData.body
          } catch (error) {
            console.error("Error downloading image:", error);
            return null;
          }
        })
      );
      setPost({...post, images: images})
      setIsImageLoaded(true);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    if (!isImageLoaded) {
      fetchImages();
    }
  }, [post]);


  const handleSubmit = async (values) => {
    try {
      const user = await getCurrentUser();

      const uploadTasks = values.images.map(async (image) => {
        const imageKey = `images/${Date.now()}_${image.name}`;
        await uploadData({
          key: imageKey,
          data: image,
          options: {
            accessLevel: "guest", // Guests should be able to view the images
          },
        }).result;
        return imageKey;
      });

      const imageKeys = await Promise.all(uploadTasks);

      // Store the data in the database
      const postInput = {
        id: post.id,
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
          email: values.email || "",
          phone: values.phoneNumber || "",
        },
      };

      await client.graphql({
        query: mutations.updatePost,
        variables: { input: postInput },
      });

      handleToastOpen("success", "Post created successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error creating post: ", error);
      handleToastOpen("error", "Error creating post. Please try again later");
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

  if (loading || !isImageLoaded) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {post ? (
        <CreatePostForm
          isEdit={true}
          postData={post}
          handleSubmit={handleSubmit}
        />
      ) : null}
      <ToastNotification
        open={toastOpen}
        severity={toastSeverity}
        message={toastMessage}
        handleClose={handleToastClose}
      />
    </div>
  );
};

export default EditPost;

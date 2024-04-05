import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Toggle from "../../components/Toggle/Toggle";
import theme from "../../theme/theme";
import "./MyPostsAndComments.css";
import PetCard from "../../components/PetCard/PetCard";
import CommentCard from "../../components/CommentCard/CommentCard";
import { useMobile } from "../../context/MobileContext";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import * as queries from "../../graphql/queries";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";
import * as mutations from "../../graphql/mutations";
import SightingCard from "../../components/SightingCard/SightingCard";

const contentTypeOptions = [
  { label: "Lost", color: theme.palette.custom.selectedCategory.lost.light },
  { label: "Found", color: theme.palette.custom.selectedCategory.found.light },
  {
    label: "Sighting",
    color: theme.palette.custom.selectedCategory.sighting.light,
  },
  { label: "Comments", color: theme.palette.custom.selectedCategory.view },
];
const postsData = [
  {
    id: "1",
    name: "Cooper",
    status: "LOST",
    gender: "MALE",
    summary: "A brown dog with a collar went missing near the park.",
    lastKnownLocation: {
      latitude: -114.1025,
      longitude: 51.0342,
      address: "Bankview",
    },
    species: "DOG",
    images: [
      "https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J",
    ],
    userID: "user1",
    createdAt: "2024-03-24T10:00:00Z",
    updatedAt: "2024-03-24T10:00:00Z",
  },
  {
    id: "2",
    name: "Nala",
    status: "FOUND",
    gender: "FEMALE",
    summary: "A black and white cat was found hiding in the bushes.",
    lastKnownLocation: {
      latitude: -114.078,
      longitude: 51.0562,
      address: "Sunnyside",
    },
    species: "CAT",
    images: [
      "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-looking-at-camera-1593184780.jpg?crop=0.6672958942897593xw:1xh;center,top&resize=980:*",
    ],
    userID: "user2",
    createdAt: "2024-03-23T15:30:00Z",
    updatedAt: "2024-03-23T15:30:00Z",
  },
];

const sightingsData = [
  {
    id: "1",
    images: [
      "https://storage.googleapis.com/proudcity/santaanaca/uploads/2022/07/Stray-Kittens-scaled.jpg",
    ],
    location: {
      latitude: -114.0201,
      longitude: 51.0342,
      address: "Inglewood",
    },
    userID: "user1",
    email: "guest@email.com",
    phoneNumber: "123-456-7890",
    createdAt: "2024-03-25T10:00:00Z",
  },
  {
    id: "2",
    images: ["https://toegrips.com/wp-content/uploads/stray-puppy-jake-.jpg"],
    location: {
      latitude: -114.14,
      longitude: 51.0703,
      address: "University Heights",
    },
    userID: "user2",
    email: "poster@email.com",
    phoneNumber: "098-765-4321",
    createdAt: "2024-03-22T10:00:00Z",
  },
];

const MyPostsAndComments = () => {
  const { isMobile } = useMobile();
  const [selectedType, setSelectedType] = useState("Lost");
  const client = generateClient({ authMode: "apiKey" });
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleToastOpen = (severity, message) => {
    setToastSeverity(severity);
    setToastMessage(message);
    setToastOpen(true);
  };
  const handleToastClose = () => {
    setToastOpen(false);
  };

  const handleContentTypeToggle = (index) => {
    setSelectedType(contentTypeOptions[index].label);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        //TODO: remove and store the logged in user information globally
        const user = await getCurrentUser();

        const commentsResponse = await client.graphql({
          query: queries.commentsByUser,
          variables: { userID: user.userId },
        });
        const comments = commentsResponse.data.commentsByUser.items;
        setCommentData(comments);

        setLoading(false);
      } catch (error) {
        handleToastOpen("error", "Error fetching comments for user.");
        console.error("Error fetching comments for user: ", error);
      }
    };

    fetchComments();
  }, []);

  const deleteComment = async (id) => {
    const deleteCommentInput = {
      id: id,
    };
    try {
      await client.graphql({
        query: mutations.deleteComment,
        variables: { input: deleteCommentInput },
      });
      const newCommentData = commentData.filter((comment) => comment.id !== id);
      setCommentData(newCommentData);
      handleToastOpen("success", "Successfully Deleted comment");
    } catch (error) {
      handleToastOpen("error", "Error deleting comment");
      console.error("Error deleting comment: ", error);
    }
  };

  const filteredPosts = postsData.filter(
    (post) => post.status.toLowerCase() === selectedType.toLowerCase()
  );

  return (
    <>
      {loading ? (
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
      ) : (
        <Box className="my-content">
          <Box width={"95%"} margin={"auto"}>
            <Toggle
              options={contentTypeOptions}
              onToggleCallback={handleContentTypeToggle}
              containerWidth={"100%"}
            />
          </Box>
          <Box
            className={
              selectedType.toLowerCase() === "sighting" && "my-sigthing-content"
            }
            sx={{ justifyContent: isMobile ? "center" : "flex-start" }}
          >
            {selectedType.toLowerCase() === "comments"
                ? commentData.map((comment, index) => (
                  <CommentCard
                    key={index}
                    owner={true}
                    id={comment.id}
                    content={comment.content}
                    parentCommentId={comment.parentCommentID}
                    username={comment.userName}
                    createdAt={comment.createdAt}
                    updatedAt={comment.updatedAt}
                    onDelete={deleteComment}
                  />
                ))
              : selectedType.toLowerCase() === "sighting"
              ? sightingsData.map((sighting, index) => (
                  <SightingCard
                    key={index}
                    owner={true}
                    img={sighting.images[0]}
                    location={sighting.location.address}
                    email={sighting.email}
                    phoneNumber={sighting.phoneNumber}
                    createdAt={sighting.createdAt}
                  />
                ))
              : filteredPosts.map((post, index) => (
                  <PetCard
                    key={index}
                    owner={true}
                    img={post.images[0]}
                    name={post.name}
                    status={post.status}
                    petType={post.species}
                    summary={post.summary}
                    location={post.lastKnownLocation.address}
                    createdAt={post.createdAt}
                    updatedAt={post.updatedAt}
                  />
                ))}
          </Box>
          <ToastNotification
            open={toastOpen}
            severity={toastSeverity}
            message={toastMessage}
            handleClose={handleToastClose}
          />
        </Box>
      )}
    </>
  );
};

export default MyPostsAndComments;

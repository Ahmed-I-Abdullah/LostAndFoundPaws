import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Toggle from "../../components/Toggle/Toggle";
import theme from "../../theme/theme";
import "./MyPostsAndComments.css";
import PetCard from "../../components/PetCard/PetCard";
import CommentCard from "../../components/CommentCard/CommentCard";
import { useMobile } from "../../context/MobileContext";
import { generateClient } from "aws-amplify/api";
import { downloadData } from "@aws-amplify/storage";
import * as queries from "../../graphql/queries";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";
import * as mutations from "../../graphql/mutations";
import SightingCard from "../../components/SightingCard/SightingCard";
import { useUser } from "../../context/UserContext";

let contentTypeOptions = [
  { label: "Lost", color: theme.palette.custom.selectedCategory.lost.light },
  { label: "Found", color: theme.palette.custom.selectedCategory.found.light },
  {
    label: "Sighting",
    color: theme.palette.custom.selectedCategory.sighting.light,
  },
  { label: "Comments", color: theme.palette.custom.selectedCategory.view },
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
  const { userState, currentUser, currentProfilePictureImageData } = useUser();
  let client = generateClient({ authMode: "apiKey" });
  if (userState !== "Guest") {
    client = generateClient({ authMode: "userPool" });
  }

  const { isMobile } = useMobile();
  const [selectedType, setSelectedType] = useState("Lost");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [postsData, setPostsData] = useState([]);
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
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (userState === "Admin") {
      contentTypeOptions = [
        {
          label: "Comments",
          color: theme.palette.custom.selectedCategory.view,
        },
      ];
      setSelectedType("Comments");
    }

    const fetchPostsData = async () => {
      try {
        const listResponse = await client.graphql({
          query: queries.postsByUser,
          variables: { userID: currentUser?.id },
        });
        const posts = listResponse.data.postsByUser.items;
        const postsWithImages = await Promise.all(
          posts.map(async (post) => {
            try {
              const firstImageUrl = post.images[0];
              const firstImageData = await downloadData({ key: firstImageUrl })
                .result;
              const firstImageSrc = URL.createObjectURL(firstImageData.body);

              post.firstImg = firstImageSrc;
              return post;
            } catch (error) {
              console.error("Error fetching image for post:", error);
              return post;
            }
          })
        );
        setPostsData(postsWithImages);
        setLoading(false);
      } catch (error) {
        handleToastOpen("error", "Error fetching posts.");
        console.error("Error fetching posts: ", error);
        setTimeout(() => {
          setToastOpen(false);
        }, 2000);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsResponse = await client.graphql({
          query: queries.commentsByUser,
          variables: { userID: currentUser?.id },
        });
        const comments = commentsResponse.data.commentsByUser.items;
        setCommentData(comments);
        setLoading(false);
      } catch (error) {
        handleToastOpen("error", "Error fetching comments for user.");
        console.error("Error fetching comments for user: ", error);
        setTimeout(() => {
          setToastOpen(false);
        }, 2000);
      }
    };
    if (currentUser) {
      fetchPostsData();
      fetchComments();
    }
  }, [currentUser]);

  const deletePost = async (id) => {
    setLoading(true);
    const deletePostInput = {
      id: id,
    };
    try {
      await client.graphql({
        query: mutations.deletePost,
        variables: { input: deletePostInput },
      });
      const newPostData = postsData.filter((post) => post.id !== id);
      setPostsData(newPostData);
      handleToastOpen("success", "Successfully deleted post.");
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
    } catch (error) {
      handleToastOpen("error", "Error deleting post.");
      console.error("Error deleting post: ", error);
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
    }
    setLoading(false);
  };

  const deleteComment = async (id) => {
    setLoading(true);
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
      handleToastOpen("success", "Successfully deleted comment.");
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
    } catch (error) {
      handleToastOpen("error", "Error deleting comment.");
      console.error("Error deleting comment: ", error);
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
    }
    setLoading(false);
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
              initialIndex={selectedIndex}
            />
          </Box>
          <Box
            className={
              selectedType.toLowerCase() === "sighting" && "my-sigthing-content"
            }
            sx={{ justifyContent: isMobile ? "center" : "flex-start" }}
          >
            {selectedType.toLowerCase() === "comments" ? (
              commentData
                .slice()
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .map((comment, index) => (
                  <CommentCard
                    key={index}
                    userId={currentUser?.id}
                    id={comment.id}
                    userProfilePicture={currentProfilePictureImageData.key}
                    content={comment.content}
                    parentCommentId={comment.parentCommentID}
                    username={currentUser?.username}
                    createdAt={comment.createdAt}
                    updatedAt={comment.updatedAt}
                    onDelete={deleteComment}
                  />
                ))
            ) : selectedType.toLowerCase() === "sighting" ? (
              sightingsData.map((sighting, index) => (
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
            ) : filteredPosts.length === 0 ? (
              <Typography variant="h1" margin={"1rem"} display={"flex"}>
                No {selectedType} posts found
              </Typography>
            ) : (
              filteredPosts.map((post, index) => (
                <PetCard
                  key={index}
                  id={post.id}
                  userId={post.userID}
                  img={post.firstImg}
                  name={post.name}
                  status={post.status}
                  petType={post.species}
                  summary={post.summary}
                  location={post.lastKnownLocation.address}
                  createdAt={post.createdAt}
                  updatedAt={post.updatedAt}
                  onDelete={deletePost}
                />
              ))
            )}
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

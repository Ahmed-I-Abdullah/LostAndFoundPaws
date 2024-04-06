import React, { useState, useEffect } from "react";
import { Box, ButtonBase, CircularProgress, Typography } from "@mui/material";
import PetCard from "../../components/PetCard/PetCard";
import SigthingCard from "../../components/SightingCard/SightingCard";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";
import { useMobile } from "../../context/MobileContext";
import { generateClient } from "aws-amplify/api";
import { downloadData } from "@aws-amplify/storage";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { useUser } from "../../context/UserContext";

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

const ListView = ({ selectedType }) => {
  const { userState, currentUser } = useUser();
  let client = generateClient({ authMode: "apiKey" });
  if (userState !== "Guest") {
    client = generateClient({ authMode: "userPool" });
  }
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const listResponse = await client.graphql({
          query: queries.listPosts,
        });
        const posts = listResponse.data.listPosts.items;
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
      }
    };

    fetchPostsData();
  }, []);

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
      const newpostsData = postsData.filter((post) => post.id !== id);
      setPostsData(newpostsData);
      handleToastOpen("success", "Successfully deleted post");
    } catch (error) {
      handleToastOpen("error", "Error deleting post");
      console.error("Error deleting post: ", error);
    }
    setLoading(false);
  };

  const handleToastOpen = (severity, message) => {
    setToastSeverity(severity);
    setToastMessage(message);
    setToastOpen(true);
  };
  const handleToastClose = () => {
    setToastOpen(false);
  };
  const { isMobile } = useMobile();
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
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
            <>
              {selectedType !== "Sighting" ? (
                filteredPosts.length === 0 ? (
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
                )
              ) : (
                sightingsData.map((sighting, index) => (
                  <SigthingCard
                    key={index}
                    owner={false} //TODO: Check if the user logged in is the owner
                    img={sighting.images[0]}
                    location={sighting.location.address}
                    reporterType={sighting.reporterType}
                    email={sighting.email}
                    phoneNumber={sighting.phoneNumber}
                    createdAt={sighting.createdAt}
                    updatedAt={sighting.updatedAt}
                  />
                ))
              )}
            </>
          )}
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

export default ListView;

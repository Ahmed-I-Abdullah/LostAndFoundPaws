import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import PetCard from "../../components/PetCard/PetCard";
import SigthingCard from "../../components/SightingCard/SightingCard";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";
import { useMobile } from "../../context/MobileContext";
import { generateClient } from "aws-amplify/api";
import { downloadData } from "@aws-amplify/storage";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { useUser } from "../../context/UserContext";
import { getSightingPhoneNumber, getSightingEmail } from "../../utils/utils";

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
  const [sightingsData, setSightingsData] = useState([]);
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
        setTimeout(() => {
          setToastOpen(false);
        }, 2000);
      }
    };

    const fetchSightingsData = async () => {
      try {
        const listResponse = await client.graphql({
          query: queries.listSightings,
        });
        const sightings = listResponse.data.listSightings.items;
        const sightingsWithImages = await Promise.all(
          sightings.map(async (sighting) => {
            try {
              const firstImageData = await downloadData({ key: sighting.image })
                .result;
              const firstImageSrc = URL.createObjectURL(firstImageData.body);

              sighting.firstImg = firstImageSrc;
              return sighting;
            } catch (error) {
              console.error("Error fetching image for sighting:", error);
              return sighting;
            }
          })
        );
        setSightingsData(sightingsWithImages);
      } catch (error) {
        handleToastOpen("error", "Error fetching sighting posts.");
        console.error("Error fetching sighting posts: ", error);
        setTimeout(() => {
          setToastOpen(false);
        }, 2000);
      }
    };

    fetchPostsData();
    fetchSightingsData();
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

  const deleteSighting = async (id) => {
    setLoading(true);
    const deleteSightingInput = {
      id: id,
    };
    try {
      await client.graphql({
        query: mutations.deleteSighting,
        variables: { input: deleteSightingInput },
      });
      const newSightingsData = sightingsData.filter(
        (sighting) => sighting.id !== id
      );
      setSightingsData(newSightingsData);
      handleToastOpen("success", "Successfully deleted sighting post.");
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
    } catch (error) {
      handleToastOpen("error", "Error deleting sighting post.");
      console.error("Error deleting sighting post: ", error);
      setTimeout(() => {
        setToastOpen(false);
      }, 2000);
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
                    id={sighting.id}
                    userId={sighting.userID}
                    img={sighting.firstImg}
                    location={sighting.location.address}
                    email={getSightingEmail(sighting)}
                    phoneNumber={getSightingPhoneNumber(sighting)}
                    createdAt={sighting.createdAt}
                    onDelete={deleteSighting}
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

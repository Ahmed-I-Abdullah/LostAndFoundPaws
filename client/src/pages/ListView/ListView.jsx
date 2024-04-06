import React, { useState, useEffect } from "react";
import { Box, ButtonBase, CircularProgress, Typography } from "@mui/material";
import PetCard from "../../components/PetCard/PetCard";
import SigthingCard from "../../components/SightingCard/SightingCard";
import ToastNotification from "../../components/ToastNotification/ToastNotificaiton";
import { useMobile } from "../../context/MobileContext";
import { generateClient } from "aws-amplify/api";
import { downloadData } from "@aws-amplify/storage";
import * as queries from "../../graphql/queries.mjs";

const ListView = ({ selectedType }) => {
  const client = generateClient({ authMode: "apiKey" });
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const [postData, setPostData] = useState([]);
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
        setPostData(postsWithImages);
        setLoading(false);
      } catch (error) {
        handleToastOpen("error", "Error fetching posts.");
        console.error("Error fetching posts: ", error);
      }
    };

    const fetchSightingsData = async () => {
      try {
        const listResponse = await client.graphql({
          query: queries.listSightings,
        });
        const sightings = listResponse.data.listSightings.items;
        const sightingsWithImages = sightings.map((sighting) => {
          sighting.firstImg = sighting.image;
          return sighting;
        });
        setSightingsData(sightingsWithImages);
      } catch (error) {
        handleToastOpen("error", "Error fetching sighting posts.");
        console.error("Error fetching sighting posts: ", error);
      }
    };

    fetchPostsData();
    fetchSightingsData();
  }, []);

  const handleToastOpen = (severity, message) => {
    setToastSeverity(severity);
    setToastMessage(message);
    setToastOpen(true);
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const { isMobile } = useMobile();

  const filteredPosts = postData.filter(
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
              {selectedType !== "Sighting"
                ? filteredPosts.map((post, index) => (
                    <Box sx={{ width: "100%" }} key={index}>
                      <PetCard
                        id={post.id}
                        key={index}
                        owner={false} //TODO: Check if the user logged in is the owner
                        img={post.firstImg}
                        name={post.name}
                        status={post.status}
                        petType={post.species}
                        summary={post.summary}
                        location={post.lastKnownLocation.address}
                        createdAt={post.createdAt}
                        updatedAt={post.updatedAt}
                      />
                    </Box>
                  ))
                : sightingsData.map((sighting, index) => (
                    <SigthingCard
                      key={index}
                      owner={false} //TODO: Check if the user logged in is the owner
                      img={sighting.firstImg}
                      location={
                        sighting.location
                          ? sighting.location.address
                          : "Location not available"
                      }
                      email={sighting.email}
                      phoneNumber={sighting.phoneNumber}
                      createdAt={sighting.createdAt}
                    />
                  ))}
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

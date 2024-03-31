import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import PetCard from "../../components/PetCard/PetCard";
import SigthingCard from "../../components/SightingCard/SightingCard";
import { useMobile } from "../../MobileContext";

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

const ListView = ({ selectedType }) => {
  const { isMobile } = useMobile();
  const filteredPosts =
    selectedType !== "All"
      ? postsData.filter(
          (post) => post.status.toLowerCase() === selectedType.toLowerCase()
        )
      : postsData;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: isMobile ? "space-between" : "flex-start",
      }}
    >
      {selectedType !== "Sighting"
        ? filteredPosts.map((post, index) => (
            <Box sx={{ width: "100%" }} key={index}>
              <PetCard
                key={index}
                owner={false} //TODO: Check if the user logged in is the owner
                img={post.images[0]}
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
              img={sighting.images[0]}
              location={sighting.location.address}
              reporterType={sighting.reporterType}
              email={sighting.email}
              phoneNumber={sighting.phoneNumber}
              createdAt={sighting.createdAt}
              updatedAt={sighting.updatedAt}
            />
          ))}
    </Box>
  );
};

export default ListView;

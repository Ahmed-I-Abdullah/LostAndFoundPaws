import React from 'react';
import { Box, Typography } from '@mui/material';
import PetCard from '../../components/PetCard/PetCard';

const postsData = [
  {
    id: "1",
    name: "Cooper",
    status: "LOST",
    gender: "MALE",
    summary: "A brown dog with a collar went missing near the park.",
    lastKnownLocation: { latitude: 123.456, longitude: 789.012, address: "15th Avenue" },
    species: "DOG",
    images: ["https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J"],
    userID: "user1",
    createdAt: "2024-03-24T10:00:00Z",
    updatedAt: "2024-03-24T10:00:00Z"
  },
  {
    id: "2",
    name: "Nala",
    status: "FOUND",
    gender: "FEMALE",
    summary: "A black and white cat was found hiding in the bushes.",
    lastKnownLocation: { latitude: 987.654, longitude: 321.098, address: "Park Street 123" },
    species: "CAT",
    images: ["https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-looking-at-camera-1593184780.jpg?crop=0.6672958942897593xw:1xh;center,top&resize=980:*"],
    userID: "user2",
    createdAt: "2024-03-23T15:30:00Z",
    updatedAt: "2024-03-23T15:30:00Z"
  }
];

const ListView = ({ selectedType }) => {
  const filteredPosts = selectedType !== "All" ?
    postsData.filter(post => post.status.toLowerCase() === selectedType.toLowerCase()) :
    postsData;
  return (
    <Box>
      {filteredPosts.map((post, index) => (
          <PetCard 
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
      ))}
    </Box>
  );
};

export default ListView;

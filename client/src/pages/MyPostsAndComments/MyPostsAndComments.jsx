import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import Toggle from "../../components/Toggle/Toggle";
import theme from "../../theme/theme";
import "./MyPostsAndComments.css";
import PetCard from "../../components/PetCard/PetCard";
import CommentCard from "../../components/CommentCard/CommentCard";
import { useMobile } from "../../context/MobileContext";
import TuneIcon from "@mui/icons-material/Tune";

const contentTypeOptions = [
  { label: "Lost", color: theme.palette.custom.selectedCategory.lost.light },
  { label: "Found", color: theme.palette.custom.selectedCategory.found.light },
  { label: "Sighting", color: theme.palette.custom.selectedCategory.sighting },
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

const commentData = [
  {
    id: 1,
    content: "This is the first comment.",
    postID: 1,
    parentCommentID: null,
    userID: 1,
    userName: "Joe Smith",
    createdAt: "2024-03-23T08:00:00Z",
    updatedAt: "2024-03-23T08:00:00Z",
  },
  {
    id: 2,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec sem euismod, varius lorem ac, dignissim elit. Mauris vehicula consectetur odio id bibendum. Nullam dapibus felis nec justo vehicula luctus. Phasellus gravida augue at arcu faucibus, nec tincidunt lorem tincidunt. Integer sed felis sapien. Vivamus sed fermentum velit. Sed vel nibh at ipsum dictum pharetra. Quisque euismod libero vel justo hendrerit bibendum. Sed tristique sapien vel posuere ultrices. Donec suscipit odio sit amet ipsum feugiat, at venenatis quam fringilla. Vivamus gravida enim nec leo vehicula, id rutrum velit dapibus. Donec convallis massa id massa interdum consequat. Suspendisse potenti. Maecenas euismod ultricies lectus, id efficitur est finibus at. Sed dapibus mauris nec ultricies feugiat. Maecenas auctor erat non eros finibus lobortis.",
    postID: 1,
    parentCommentID: null,
    userID: 2,
    userName: "Joe Smith",
    createdAt: "2024-02-01T08:15:00Z",
    updatedAt: "2024-02-01T08:15:00Z",
  },
  {
    id: 3,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec sem euismod, varius lorem ac, dignissim elit. Mauris vehicula consectetur odio id bibendum. Nullam dapibus felis nec justo vehicula luctus. Phasellus gravida augue at arcu faucibus, nec tincidunt lorem tincidunt. Integer sed felis sapien. Vivamus sed fermentum velit. Sed vel nibh at ipsum dictum pharetra. Quisque euismod libero vel justo hendrerit bibendum. Sed tristique sapien vel posuere ultrices. Donec suscipit odio sit amet ipsum feugiat, at venenatis quam fringilla. Vivamus gravida enim nec leo vehicula, id rutrum velit dapibus. Donec convallis massa id massa interdum consequat. Suspendisse potenti. Maecenas euismod ultricies lectus, id efficitur est finibus at",
    postID: 1,
    parentCommentID: 1,
    userID: 3,
    userName: "Joe Smith",
    createdAt: "2024-01-17T08:30:00Z",
    updatedAt: "2024-01-17T08:30:00Z",
  },
];

const MyPostsAndComments = () => {
  const { isMobile } = useMobile();
  const [selectedType, setSelectedType] = useState("Lost");

  const handleContentTypeToggle = (index) => {
    setSelectedType(contentTypeOptions[index].label);
  };

  const filteredPosts = postsData.filter(
    (post) => post.status.toLowerCase() === selectedType.toLowerCase()
  );

  return (
    <Box className="my-content">
      <Toggle
        options={contentTypeOptions}
        onToggleCallback={handleContentTypeToggle}
        containerWidth={"100%"}
      />
      {selectedType.toLowerCase() === "comments"
        ? commentData.map((comment, index) => (
            <CommentCard
              key={index}
              owner={true}
              id={comment.id}
              content={comment.content}
              parentCommentId={comment.parentCommentID}
              parentCommentUsername={"hii"} //TODO: add parent username and content in shema
              parentCommentContent={"jii"}
              username={comment.userName}
              createdAt={comment.createdAt}
              updatedAt={comment.updatedAt}
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
  );
};

export default MyPostsAndComments;

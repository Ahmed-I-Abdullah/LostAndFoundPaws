import React, { useState } from "react";
import { Typography, Card, CardMedia, Box, ButtonBase } from "@mui/material";
import { useMobile } from "../../context/MobileContext";
import SightingDialog from "../SightingDialog/SightingDialog";

const SightingCard = ({
  id,
  userId,
  img,
  location,
  email,
  phoneNumber,
  createdAt,
  onDelete,
}) => {
  const { isMobile } = useMobile();
  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleClickOpen = () => {
    setIsCardOpen(true);
  };

  return (
    <div>
      <ButtonBase onClick={handleClickOpen}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: isMobile ? "1rem" : "1rem 2rem",
            width: isMobile ? "300px" : "350px",
            height: "350px",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "250px" }}
            image={img}
            alt="sighting-picture"
          />
          <Box sx={{ padding: "1rem", marginTop: "10px" }}>
            <Typography
              variant="h1"
              component="div"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {location}
            </Typography>
            <Typography variant="body3" color="text.secondary">
              Posted on {createdAt.split("T")[0]}
            </Typography>
          </Box>
        </Card>
      </ButtonBase>

      <SightingDialog
        id={id}
        userId={userId}
        img={img}
        location={location}
        email={email}
        phoneNumber={phoneNumber}
        createdAt={createdAt}
        onDelete={onDelete}
        isCardOpen={isCardOpen}
        setIsCardOpen={setIsCardOpen}
      />
    </div>
  );
};

export default SightingCard;

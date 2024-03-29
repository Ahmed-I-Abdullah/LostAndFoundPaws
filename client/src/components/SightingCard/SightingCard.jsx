import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
  ButtonBase,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import ClosIcon from "@mui/icons-material/Close";
import { useMobile } from "../../MobileContext";
import { formatDistanceToNow } from "date-fns";

const SightingCard = ({
  img,
  location,
  reporterType,
  email,
  phoneNumber,
  createdAt,
  updatedAt,
}) => {
  const { isMobile } = useMobile();
  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleClickOpen = () => {
    setIsCardOpen(true);
  };

  const handleClose = () => {
    setIsCardOpen(false);
  };

  return (
    <div>
      <ButtonBase onClick={handleClickOpen}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
            marginRight: "2rem",
            width: isMobile ? "38vw" : "20vw",
            height: isMobile ? "25vh" : "auto",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "auto" }}
            image={img}
            alt="sighting-picture"
          />
          <Box sx={{ padding: "1rem" }}>
            <Typography variant="h1" component="div">
              {location}
            </Typography>
            <Typography variant="body3" color="text.secondary">
              Posted {formatDistanceToNow(new Date(createdAt))} ago
            </Typography>
          </Box>
        </Card>
      </ButtonBase>

      <Dialog open={isCardOpen} onClose={handleClose}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 3, top: 3, color: "black" }}
        >
          <ClosIcon />
        </IconButton>
        <DialogContent>
          <Card sx={{ marginTop: "1rem" }}>
            <CardMedia
              component="img"
              sx={{ width: "100%", height: "auto" }}
              image={img}
              alt="sighting-picture"
            />
            <Box sx={{ padding: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h1" component="div">
                  {location}
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Posted {formatDistanceToNow(new Date(createdAt))} ago
                </Typography>
              </div>
              <div style={{ marginTop: "30px" }} />
              <div>
                <Typography variant="h3" color="text.secondary">
                  <strong>Contact Information</strong>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `<strong>Phone Number:</strong> ${phoneNumber}`,
                    }}
                  />
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `<strong>Email:</strong> ${email}`,
                    }}
                  />
                </Typography>
              </div>
            </Box>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SightingCard;

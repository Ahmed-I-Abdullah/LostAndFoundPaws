import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import theme from "../../theme/theme";
import { useMobile } from "../../context/MobileContext";
import { formatDistanceToNow } from "date-fns";

const SightingCard = ({
  owner,
  img,
  location,
  reportType,
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
          <CloseIcon />
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
              <Grid
                sx={{
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
              </Grid>
              <Grid sx={{ marginTop: "30px" }} />
              <Grid>
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
              </Grid>
              {owner && (
                <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: `${theme.palette.custom.greyBkg.tag}`,
                      color: `${theme.palette.text.primary}`,
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}`,
                      },
                    }}
                  >
                    <DeleteIcon />
                    <Typography variant="h9">Delete</Typography>
                  </Button>
                </Grid>
              )}
            </Box>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SightingCard;

import React from "react";
import {
  Typography,
  Chip,
  Stack,
  Grid,
  Card,
  CardMedia,
  Box,
  Button,
  ButtonBase,
} from "@mui/material";
import theme from "../../theme/theme";
import { useMobile } from "../../MobileContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const PetCard = ({
  owner,
  img,
  name,
  summary,
  status,
  petType,
  location,
  createdAt,
  updatedAt,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "LOST":
        return theme.palette.custom.selectedCategory.lost.dark;
      case "FOUND":
        return theme.palette.custom.selectedCategory.found.dark;
      default:
        return "";
    }
  };
  const { isMobile } = useMobile();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    navigate("/viewPost");
  };

  return (
    <Card sx={{ display: "flex", width: "95%", margin: "1rem auto" }} onClick={handleClickOpen}>
      <CardMedia
        component="img"
        sx={{ width: isMobile ? 100 : 150 }}
        image={img}
        alt="pet-picture"
      />
      <Grid
        container
        sx={{ flexDirection: "column", margin: "1rem" }}
        item
        zeroMinWidth
        gap={1}
      >
        <Grid item xs zeroMinWidth>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Typography variant="h7" fontWeight={"bold"} noWrap>
              {name}
            </Typography>
            {owner && (
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
            )}
          </Box>
          <Stack
            direction="row"
            sx={{
              overflow: "auto",
              gap: 1,
              width: "90%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Chip
              label={status}
              sx={{
                width: "fit-content",
                backgroundColor: getStatusColor(),
              }}
            />
            <Chip
              label={petType}
              sx={{
                width: "fit-content",
              }}
            />
          </Stack>
          <Typography noWrap variant="subtitle1">
            {summary}
          </Typography>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography fontWeight={"bold"} noWrap variant="subtitle2">
            {location}
          </Typography>
        </Grid>
        <Grid
          item
          xs
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: "1rem",
          }}
        >
          <Typography variant="subtitle2">
            {`Posted: ${createdAt.split("T")[0]} - Updated: ${
              updatedAt.split("T")[0]
            }`}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PetCard;

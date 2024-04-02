import React, { useState } from "react";
import {
  Typography,
  Chip,
  Stack,
  Grid,
  Card,
  CardMedia,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import theme from "../../theme/theme";
import { useMobile } from "../../context/MobileContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import StatusLabel from "../StatusLabel/StatusLabel";

const PetCard = ({
  id,
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
  const { isMobile } = useMobile();
  const navigate = useNavigate();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleClickOpen = () => {
    navigate(`/posts/${id}`);
  };

  const handleDeleteConfirmed = (event) => {
    event.stopPropagation();
    /** TODO: handle delete post */
    setOpenConfirmDelete(false);
  };

  return (
    <Card
      sx={{
        display: "flex",
        width: "95%",
        margin: "1rem auto",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={handleClickOpen}
    >
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
            <Typography
              variant={small ? "h7" : "h6"}
              fontWeight={"bold"}
              noWrap
            >
              {name}
            </Typography>
            {owner && (
              <Button
                size={small ? "small" : "medium"}
                variant="contained"
                color="error"
                onClick={(event) => {
                  event.stopPropagation();
                  setOpenConfirmDelete(true);
                }}
                sx={{
                  borderRadius: 2,
                }}
                startIcon={<DeleteIcon />}
              >
                Delete
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
            <StatusLabel status={status} />
            <StatusLabel status={petType} />
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
      <ConfirmDialog
        open={openConfirmDelete}
        onClose={(event) => {
          event.stopPropagation();
          setOpenConfirmDelete(false);
        }}
        onConfirm={(event) => handleDeleteConfirmed(event)}
        title="Are you sure you want to delete this post?"
      />
    </Card>
  );
};

export default PetCard;

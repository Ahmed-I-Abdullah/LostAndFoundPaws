import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";
import theme from "../../theme/theme";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import ReportPost from "../../components/ReportPopup/ReportPopup";
import { useUser } from "../../context/UserContext";
import ToastNotification from "../ToastNotification/ToastNotificaiton";

const SightingDialog = ({
  id,
  userId,
  img,
  location,
  email,
  phoneNumber,
  createdAt,
  onDelete,
  isCardOpen,
  setIsCardOpen,
}) => {
  const navigate = useNavigate();
  const { userState, currentUser } = useUser();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setIsCardOpen(false);
  };

  const handleDeleteConfirmed = (event, id) => {
    event.stopPropagation();
    onDelete(id);
    setOpenConfirmDelete(false);
  };

  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastSeverity, setToastSeverity] = React.useState("success");
  const [toastMessage, setToastMessage] = React.useState("");

  const handleToastOpen = (severity, message) => {
    setToastSeverity(severity);
    setToastMessage(message);
    setToastOpen(true);
  };

  const handleToastClose = (event, reason) => {
    setToastOpen(false);
  };

  const handleReportSubmitted = () => {
    handleToastOpen("success", "Report submitted successfully.");
  };

  return (
    <>
      <Dialog
        open={isCardOpen}
        onClose={handleClose}
        PaperProps={{ sx: { minWidth: "300px", zIndex: "100" } }}
      >
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
              sx={{ width: "100%", height: "400px" }}
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
                <Typography
                  variant={small ? "h7" : "h6"}
                  fontWeight={"bold"}
                  style={{ paddingRight: "10px", width: "600px" }}
                >
                  {location}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="#979797"
                  style={{ width: "250px" }}
                >
                  Posted: {createdAt ? createdAt.split("T")[0] : "Unavailable"}
                </Typography>
              </Grid>
              <Grid sx={{ marginTop: "30px" }} />
              <Grid>
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  Contact Information
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `<strong>Phone Number:</strong> ${
                        phoneNumber ? phoneNumber : "Unavailable"
                      }`,
                    }}
                  />
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <strong>Email:</strong>&nbsp;
                  {email ? (
                    <a href={`mailto:${email}`}>{email}</a>
                  ) : (
                    "Unavailable"
                  )}
                </Typography>
                {userState !== "Guest" &&
                  userState !== "Admin" &&
                  userId !== currentUser?.id && (
                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: `${theme.palette.custom.greyBkg.tag}`,
                          borderRadius: 2,
                          color: "#000",
                          marginRight: "8px",
                        }}
                        onClick={() => setIsReportModalOpen(true)}
                        startIcon={<FlagIcon />}
                      >
                        <Typography variant="h9">Report</Typography>
                      </Button>
                    </Grid>
                  )}
              </Grid>
              {(userId === currentUser?.id || userState === "Admin") && (
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "10px",
                  }}
                >
                  <Button
                    size={"small"}
                    variant="contained"
                    sx={{
                      backgroundColor: theme.palette.custom.greyBkg.tag,
                      borderRadius: 2,
                      color: "#000",
                      marginRight: "8px",
                    }}
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/sightings/${id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
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
                </Grid>
              )}
            </Box>
          </Card>
        </DialogContent>
      </Dialog>
      {isReportModalOpen && userId !== currentUser?.id && (
        <ReportPost
          contentType="sighting"
          itemId={id}
          userId={currentUser?.id}
          onClose={() => setIsReportModalOpen(false)}
          onReport={handleReportSubmitted}
        />
      )}
      <ToastNotification
        open={toastOpen}
        severity={toastSeverity}
        message={toastMessage}
        handleClose={handleToastClose}
      />
      <ConfirmDialog
        open={openConfirmDelete}
        onClose={(event) => {
          event.stopPropagation();
          setOpenConfirmDelete(false);
        }}
        onConfirm={(event) => handleDeleteConfirmed(event, id)}
        title="Are you sure you want to delete this sighting post?"
        isDelete={true}
      />
    </>
  );
};

export default SightingDialog;

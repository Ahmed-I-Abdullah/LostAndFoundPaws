import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import SightingCard from "../SightingCard/SightingCard";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import DeleteIcon from "@mui/icons-material/Delete";

const ReportedSightingCard = ({ sightingData, report, onDelete, onIgnore }) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openConfirmIgnore, setOpenConfirmIgnore] = useState(false);

  const handleDeleteConfirmed = () => {
    onDelete(sightingData.id);
    setOpenConfirmDelete(false); // Close the dialog
  };

  const handleIgnoreConfirmed = () => {
    onIgnore(sightingData.id);
    setOpenConfirmIgnore(false); // Close the dialog
  };

  return (
    <Box
      sx={{
        margin: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box sx={{ marginBottom: "10px" }}>
        <SightingCard
          owner={false}
          img={sightingData.firstImg}
          location={sightingData.location.address}
          email={sightingData.contactInfo.email}
          phoneNumber={sightingData.contactInfo.phone}
          createdAt={sightingData.createdAt}
        />
      </Box>
      <Box sx={{ borderTop: "1px solid #eee", padding: "16px" }}>
        <Typography variant="h2" fontWeight="bold" sx={{ marginBottom: "8px" }}>
          Report Description
        </Typography>
        <Typography sx={{ marginBottom: "10px" }}>
          Report Reason: {report.reason}
        </Typography>
        <Typography sx={{ marginBottom: "16px" }}>
          Report Descriptions: {report.description}
        </Typography>

        {/* Button container */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenConfirmDelete(true)}
            startIcon={<DeleteIcon />}
            sx={{ marginRight: "8px" }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenConfirmIgnore(true)}
          >
            Ignore
          </Button>
        </Box>
      </Box>

      {/* Use the ConfirmDialog for delete confirmation */}
      <ConfirmDialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
        onConfirm={handleDeleteConfirmed}
        title="Are you sure you want to delete this sighting post?"
      />

      {/* Use the ConfirmDialog for ignore confirmation */}
      <ConfirmDialog
        open={openConfirmIgnore}
        onClose={() => setOpenConfirmIgnore(false)}
        onConfirm={handleIgnoreConfirmed}
        title="Are you sure you want to mark this report as ignored?"
      />
    </Box>
  );
};

export default ReportedSightingCard;

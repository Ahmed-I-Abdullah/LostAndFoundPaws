import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import SightingCard from "../SightingCard/SightingCard";
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import DeleteIcon from '@mui/icons-material/Delete';

const ReportedSightingsCard = ({ sightingData, report, onDelete, onIgnore }) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openConfirmIgnore, setOpenConfirmIgnore] = useState(false);

  const handleDeleteConfirmed = () => {
    onDelete(sightingData.id, report.id); 
    setOpenConfirmDelete(false); 
  };

  const handleIgnoreConfirmed = () => {
    onIgnore(report.id); 
    setOpenConfirmIgnore(false);
  };

  return (
    <Box sx={{ margin: '16px', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', backgroundColor: '#f9f9f9' }}>
      <Box sx={{ marginBottom: '10px' }}>
        {sightingData == null ? (<h3>Sighting Deleted</h3>) : (
          <SightingCard
            id={sightingData.id}
            userId={sightingData.userId}
            img={sightingData.img}
            location={sightingData.location.address}
            email={sightingData.email}
            phoneNumber={sightingData.phoneNumber}
            createdAt={sightingData.createdAt}
            onDelete={onDelete} 
          />
        )}
      </Box>
      <Box sx={{ borderTop: '1px solid #eee', padding: '16px' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: '8px' }}>Report Description</Typography>
        <Typography sx={{ marginBottom: '10px' }}>Report Reason: {report.reason}</Typography>
        <Typography sx={{ marginBottom: '16px' }}>Report Description: {report.description}</Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenConfirmDelete(true)}
            startIcon={<DeleteIcon />} 
            sx={{ marginRight: '8px' }}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={() => setOpenConfirmIgnore(true)}>Ignore</Button>
        </Box>
      </Box>

      <ConfirmDialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
        onConfirm={handleDeleteConfirmed}
        title="Are you sure you want to delete this sighting and report?"
      />

      <ConfirmDialog
        open={openConfirmIgnore}
        onClose={() => setOpenConfirmIgnore(false)}
        onConfirm={handleIgnoreConfirmed}
        title="Are you sure you want to mark this report as ignored?"
      />
    </Box>
  );
};

export default ReportedSightingsCard;

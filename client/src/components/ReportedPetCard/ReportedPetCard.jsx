import React, { useState } from "react";
import { Box, Typography, Button} from "@mui/material";
import PetCard from "../PetCard/PetCard";
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import DeleteIcon from '@mui/icons-material/Delete';

const ReportedPetCard = ({ petData, onDelete, onIgnore }) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openConfirmIgnore, setOpenConfirmIgnore] = useState(false);

  const handleDeleteConfirmed = () => {
    onDelete(petData.id);
    setOpenConfirmDelete(false); // Close the dialog
  };

  const handleIgnoreConfirmed = () => {
    onIgnore(petData.id);
    setOpenConfirmIgnore(false); // Close the dialog
  };

  return (
    <Box sx={{ margin: '16px', border: '1px solid #ccc', borderRadius: '8px', padding: '16px', backgroundColor: '#f9f9f9' }}>
      <Box sx={{ marginBottom: '16px' }}>
        <PetCard
          owner={false} //TODO: Check if the user logged in is the owner
          img={petData.images[0]}
          name={petData.name}
          status={petData.status}
          petType={petData.species}
          summary={petData.summary}
          location={petData.lastKnownLocation.address}
          createdAt={petData.createdAt}
          updatedAt={petData.updatedAt}
        />
      </Box>
      <Box sx={{ borderTop: '1px solid #eee', padding: '16px' }}>
        <Typography variant="h6" sx={{ marginBottom: '8px' }}>Report Description</Typography>
        <Typography sx={{ marginBottom: '16px' }}>Report Reason: Inappropriate</Typography>
        <Typography sx={{ marginBottom: '16px' }}>Report Descriptions: Too cute</Typography>
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

    {/* Use the ConfirmDialog for delete confirmation */}
    <ConfirmDialog
      open={openConfirmDelete}
      onClose={() => setOpenConfirmDelete(false)}
      onConfirm={handleDeleteConfirmed}
      title="Are you sure you want to delete this post?"
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

export default ReportedPetCard;

import React from 'react';
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';

const ConfirmDialog = ({ open, onClose, onConfirm, title, children }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions sx={{ justifyContent: 'space-between', padding: '8px 24px' }}>
        {children}
        <Button variant="outlined" onClick={onClose} sx={{ flexGrow: 1, margin: '0 8px' }}>
          No
        </Button>
        <Button variant="contained" onClick={onConfirm} sx={{ flexGrow: 1, margin: '0 8px' }}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteConfirmationModal = ({ open, onClose, onConfirm, fileName }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-dialog-title"
      aria-describedby="delete-confirmation-dialog-description"
    >
      <DialogTitle id="delete-confirmation-dialog-title">Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-confirmation-dialog-description">
          Are you sure you want to delete the file "{fileName}"?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
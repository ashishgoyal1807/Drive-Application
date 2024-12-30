import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Box
} from '@mui/material';
import { useSelector } from 'react-redux';


const ShareFileModal = ({ open, onClose, onShare, fileId,setMsg }) => {
  const [email, setEmail] = useState('');
  const [emailDisplay,setemailDisplay]=useState('');
  const token = useSelector((state) => state.token);
  const formData = new FormData();
  

  const handleAddEmail = () => {
    // Update the email state directly
    setemailDisplay(email);
    setEmail(email.trim()); // Trim spaces from the entered email
  };

  const handleShare = async () => {
    // Call your backend API to share the file with the listed email
    
    if (email && fileId) {
        // Append the single email to formData
        formData.append('email', email);
        formData.append('fileId', fileId);
        const response = await fetch(`http://localhost:3001/sharefile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ email, fileId }), // Send email and fileId in the request body as JSON
        });
    
        const message=await response.json();
        setMsg(message.message);
        onClose();
        // Optionally, close the modal after sharing
        
      }

      
  };

 

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share File</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            sx={{ mt: 1 }}
            label="Enter Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button sx={{ ml: 2 }} variant="outlined" onClick={handleAddEmail}>
            Add Email
          </Button>
        </Box>

        <div style={{ marginTop: '10px' }}>
           { emailDisplay && <Chip
              key={email}
              label={emailDisplay}
              onDelete={() => {setEmail(''); setemailDisplay('') }}
            />}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleShare} disabled={!emailDisplay}>
          Share
        </Button>

       
       
      </DialogActions>
    </Dialog>
  );
};

export default ShareFileModal;
import React from 'react';
import FileUpload from './Upload.jsx';
import { Box } from '@mui/material';

const UploadComponent = () => {
  const handleFileUpload = (files) => {
    // Perform actions with the selected files (e.g., upload to server)
  
  };

  return (
    <Box sx={{mt:3}}>
      <FileUpload onFileUpload={handleFileUpload} />
    </Box>
  );
};

export default UploadComponent;
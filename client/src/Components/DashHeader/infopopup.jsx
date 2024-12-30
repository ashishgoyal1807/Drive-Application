import React, { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const InfoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        onClick={handleIconClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="info-popup-title"
        aria-describedby="info-popup-description"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              width: 300,
            }}
          >
            <Typography id="info-popup-title" variant="h6" component="div">
              Information
            </Typography>
            <Typography id="info-popup-description" sx={{ mt: 2 }}>
            <Box>
                <ul>
                    <li>8 files</li>
                    <li>1 folder</li>
                    <li>6.81 mb used of 2 gb</li>
                </ul>
            </Box>
            </Typography>
          </Box>
        </ClickAwayListener>
      </Modal>
    </div>
  );
};

export default InfoPopup;
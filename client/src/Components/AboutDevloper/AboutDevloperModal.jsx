import React from 'react';
import { Modal, Typography, Button, Box, Link } from '@mui/material';

export default function AboutDeveloperModal({ open, handleClose })
 {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          About the Developer
        </Typography>
        <Typography variant="body1" paragraph>
          Ayush Anand is an engineering student at The LNMIIT Jaipur, highly passionate about web development.
          He specializes in the MERN stack (MongoDB, Express.js, React.js, Node.js) and is dedicated
          to creating efficient and robust web applications.
        </Typography>
        <Typography variant="body1" paragraph>
          For more details and to explore Ayush Anand's work, you can visit his personal website:
          <br />
          <Link href="https://d2wexx3khzrajd.cloudfront.net/" target="_blank" rel="noopener noreferrer">
            ayushanandmishra.info
          </Link>
        </Typography>
        <Typography variant="h6" component="div" sx={{ mt: 2, mb: 1 }}>
          Delete Account
        </Typography>
        <Typography variant="body1" paragraph>
          To delete your account, kindly drop an email to Ayush Anand at:
          <br />
          <Link href="mailto:ayushanandmishra@gmail.com" target="_blank" rel="noopener noreferrer">
            ayushanandmishra@gmail.com
          </Link>
        </Typography>
        <Button onClick={handleClose} variant="contained">
          Close
        </Button>
      </Box>
    </Modal>
  );
}


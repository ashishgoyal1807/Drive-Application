import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  const footerStyle = {
    
    height:'3.5rem',
    bottom: 0,
    width: '100%',
    backgroundColor: '#2196f3', // You can replace this with your desired color
    padding: '10px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    
  };

  const linkStyle = {
    color: '#fff', // White color for links
    textDecoration: 'none',
    marginRight: '10px', // Adjust spacing between links
    '&:hover': {
      textDecoration: 'underline',
    },
  };

  return (
    <Box style={footerStyle}>
      <Typography variant="body2">
        Developed By: Jane Doe
      </Typography>
      <Typography>
        Drive
      </Typography>
      <Typography variant="body2">
        <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
          Instagram
        </Link>
        {' | '}
        <Link href="https://github.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
          GitHub
        </Link>
        {' | '}
        <Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
          LinkedIn
        </Link>
      </Typography>
      
    </Box>
  );
};

export default Footer;
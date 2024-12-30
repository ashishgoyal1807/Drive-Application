import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';

const ShareWithModal = ({ fileId, onClose }) => {
  const [sharedInfo, setSharedInfo] = useState([]);
  const token=useSelector((state)=>state.token);

  useEffect(() => {
    // Hit the API to get shared info when the modal is first rendered
    const fetchSharedInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getsharedwith/${fileId}`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`
          }
        });

        if (response) {
          const data = await response.json();
          
          setSharedInfo(data.sharedInfo || []);
        } else {
          console.error('Error fetching shared info:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching shared info:', error.message);
      }
    };

    fetchSharedInfo();
  }, [fileId]);



  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Shared With</DialogTitle>
      <DialogContent>
        {sharedInfo && (sharedInfo.length > 0 ? (
          <List>
            {sharedInfo.map((person) => (
              <ListItem key={person.email}>
                <ListItemText
                  primary={person.name}
                  secondary={<Typography variant="body2">{person.email}</Typography>}
                />
                {/* <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => {console.log('removed user for sharing')}}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction> */}
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No shared information available.</Typography>
        ))}
      </DialogContent>
      <Button onClick={onClose}>Close</Button>
    </Dialog>
  );
};

export default ShareWithModal;
import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalViewer = ({ fileurl, fileType, onClose }) => {

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide in={false} unmountOnExit direction="up" ref={ref} {...props} />;
  });

  const renderContent = () => {
    if (['doc', 'docx', 'txt', 'ppt', 'pptx', 'xls', 'xlsx'].includes(fileType)) {
      return (
        <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(fileurl)}&embedded=true`} title="Text Viewer" width="80%" height="600px" />
      );
    }
    else if(fileType==='pdf')
    {
      return(
        <iframe src={fileurl} title="PDF Viewer" width="80%" height="600px" />
      )
    } 
    else if (['jpeg', 'jpg', 'png', 'gif', 'tiff', 'bmp', 'jfif'].includes(fileType)) {
      return <img src={fileurl} alt="Image Preview" style={{ width: '80%' }} />;
    } else if (['webm', 'mp4', '3gpp', 'mov', 'avi', 'mkv', 'ts'].includes(fileType)) {
      return (
        <video width="80%" height="auto" controls>
          <source src={fileurl} />
          Your browser does not support the video tag.
        </video>
      );
    }
    else if (fileType === 'mp3') {
      return (<audio controls>
        <source src={fileurl} />
        Your browser does not support the audio tag.
      </audio>)
    }
    else {
      return <p>Unsupported file type but you can still download the file to your computer</p>;
    }
  };

  return (
    <Dialog open={true}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          boxShadow: 'none',
        },
      }}
    >
      <DialogTitle>

        {/* <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={onClose}>
          <CloseIcon />
        </IconButton> */}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>

        {renderContent()}

      </DialogContent>
    </Dialog>
  );
};

export default ModalViewer;
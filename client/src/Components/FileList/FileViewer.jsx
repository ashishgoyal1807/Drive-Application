import React from 'react';
import { useParams } from 'react-router-dom';

const FileViewer = () => {
  // Implement file rendering based on the fileType
  // You may use different libraries or native HTML elements for different file types
  // For example, you can use <iframe> for PDFs, <img> for images, etc.

  const {encfileUrl,encfileType}=useParams();

  
  const fileurl=decodeURIComponent(encfileUrl);
  const fileType=decodeURIComponent(encfileType);
  return (
    <div>
      {fileType === 'pdf' && <iframe style={{height:'80vh',width:'80vw'}} src={fileurl} title="PDF Viewer" />}
      {fileType === 'jpeg' && <img style={{height:'80vh',width:'80vw'}} src={fileurl} alt="Image Preview" />} 
      {fileType === 'mp4' && (
        <video width="80%" height="80%" controls>
          <source src={fileurl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default FileViewer;
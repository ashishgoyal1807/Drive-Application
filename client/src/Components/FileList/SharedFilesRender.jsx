import React, { useEffect, useState, useCallback } from 'react';
import FileList from './FileList';
import { useSelector } from 'react-redux';
import { TextField,Box } from '@mui/material';
import Loader from '../Loader';

const App = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFile, setFilteredFile] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const user = useSelector((state) => state.user);
  const render = useSelector((state) => state.render);
  const token = useSelector((state) => state.token);
  const id = user._id;

  const formData = new FormData();
  formData.append("id", id);

  const getFile = async () => {
    try {
      const response = await fetch(`http://localhost:3001/getsharedfile/${id}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false); // Set loading to false when files are fetched
    }
  };

  useEffect(() => {
    setLoading(true);
    getFile();
  }, []);
  useEffect(() => {
    getFile();
  }, [render]);

  const memoizedTesting = useCallback(() => {
    if (searchTerm.trim() === "") {
      setFilteredFile(files); // If the search term is empty, show all files
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filteredFiles = files.filter(file =>
        file.fileName.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredFile(filteredFiles);
    }
  }, [searchTerm, files]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      memoizedTesting();
    }, 500); // Adjust the delay time as needed

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, memoizedTesting]);



  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     memoizedTesting();
  //   }, 300); // Adjust the delay time as needed

  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchTerm, files]);

  // ...

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  return (
    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column' }}>
      <h1>Shared Files</h1>
     
      <TextField value={searchTerm} onChange={handleSearch} id="outlined-basic" label="Search File" variant="outlined" />
      
      
      {loading ? (
        <Loader /> // Render Loader while files are being fetched
      ) : (
        <FileList sharedFiles={true} files={filteredFile} />
      )}

    </div>
  );
};

export default App;
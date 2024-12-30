import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useMediaQuery } from '@mui/material';
import { setRender } from '../../reduxStore/state';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalViewer from './ModalViewer';
import { useState, useEffect } from 'react';
import ShareFileModal from './ShareFileModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ShareWithModal from './SharedWithModal';
import DeleteConfirmationModal from './DeleteConfirmModal';
import VideoFileIcon from '@mui/icons-material/VideoFile';




const File = ({ fileName, fileType, fileOwner, fileSize = 32456, fileId, fileurl, sharedFiles }) => {

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const rerender = useSelector((state) => state.render);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const userId = user._id;
    const isNonMobileScreens = useMediaQuery("(min-width:820px)");
    const isNonMobileScreens2 = useMediaQuery("(min-width:1000px)");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const [isSharedWithOpen, setSharedWithModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const handleDeleteClick = () => {
        // Set the state to open the modal
        setDeleteModalOpen(true);
        handleCloseUserMenu();

    };

    const handleConfirmDelete = async () => {
        // Perform the delete action here
        // Close the modal after deletion
        await handleDelete();
        setDeleteModalOpen(false);
    };

    const handleCloseModal = () => {
        // Handle the case when the user closes the modal without confirming
        setDeleteModalOpen(false);
        handleCloseUserMenu();
    };


    const handleFileClick = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleOpenShareModal = () => {
        setShareModalOpen(true);
    };

    const handleCloseShareModal = () => {
        setShareModalOpen(false);
    };

    const handleOpenSharedWith = () => {
        setSharedWithModalOpen(true);
        handleCloseUserMenu();
    }
    const handleCloseSharedWith = () => {
        setSharedWithModalOpen(false);
    }

    const handleShareFile = (sharedEmails) => {
        // Implement your file-sharing logic here using the sharedEmails
       
        // You can make an API call to share the file with the listed emails
        // Close the modal after sharing
        handleCloseShareModal();
    };



    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const Icon = () => {
        if (['webm', 'mp4', '3gpp', 'mov', 'avi','mkv','ts'].includes(fileType)) {
            return (<VideoFileIcon />)
        } else if (['jpeg','jpg', 'png', 'gif', 'tiff', 'bmp','jfif'].includes(fileType)) {
            return (<ImageIcon />)
        } else if (fileType === 'pdf') {
            return (<PictureAsPdfIcon />)
        }
         else {
            return (<InsertDriveFileIcon />);
        }
    }

    if (fileName.length > 20) {
        fileName = fileName.substring(0, 20) + "...";
    }

    const handleDelete = async () => {

        try {
            const response = await fetch(`http://localhost:3001/deletefile/${fileId}/${userId}`,
                {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
        }
        catch (err) {
            console.log({ message: err.message });
        }

        dispatch(
            setRender({
                render: !rerender
            }))
    }

    function formatFileSize(bytes) {
        const KB = 1024;
        const MB = 1024 * KB;
        const GB = 1024 * MB;
    
        if (bytes < MB) {
            // Convert to KB
            const sizeInKB = (bytes / KB).toFixed(2);
            return `${sizeInKB} KB`;
        } else if (bytes < GB) {
            // Convert to MB
            const sizeInMB = (bytes / MB).toFixed(2);
            return `${sizeInMB} MB`;
        } else {
            // Convert to GB
            const sizeInGB = (bytes / GB).toFixed(2);
            return `${sizeInGB} GB`;
        }
    }

    const onDownload = () => {
        window.open(fileurl, '_blank')
    };
    useEffect(() => {
        if (msg) {
            window.alert(msg);
            setMsg('');  // Clear the message after showing the alert
        }
    }, [msg]);


    return (
        <ListItem sx={{
            "&:hover": {
                backgroundColor: "#f0f0f0", // Change the background color on hover
            },
            mb: 1,
            cursor: 'pointer'
        }}>
            <ListItemIcon>
                {Icon()}
            </ListItemIcon>
            <ListItemText>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box onClick={handleFileClick}  sx={{ width: (isNonMobileScreens ? '33%' : '48%') }}>
                        <Typography sx={{
                            textDecoration: 'none', '&:hover': {
                                textDecoration: 'underline', // Underline on hover
                                cursor: 'pointer',
                            },
                            fontSize: (isNonMobileScreens2 ? '1.1rem' : '0.9rem')
                        }} variant="h6">{isNonMobileScreens ? fileName : fileName.substring(0, 9) + "..."}</Typography>
                        <Typography sx={{ fontSize: (isNonMobileScreens2 ? '0.84rem' : '0.65rem') }} variant="subtitle2" color="textSecondary">
                            Owner: {fileOwner}
                        </Typography>
                    </Box>
                    {/* <Box>
                        <Typography variant="subtitle2" color="textSecondary">
                            Type: {fileType}
                        </Typography>
                    </Box> */}
                    <Box sx={{ width: '13%', cursor: 'pointer' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: (isNonMobileScreens2 ? '0.8rem' : '0.65rem') }} variant="subtitle2" color="textSecondary">
                            {fileType}
                        </Typography>
                    </Box>

                    <Box sx={{ width: '13%', fontSize: (isNonMobileScreens2 ? '2rem' : '1rem'), cursor: 'pointer' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: (isNonMobileScreens2 ? '0.8rem' : '0.6rem') }} variant="subtitle2" color="textSecondary">
                            {formatFileSize(fileSize)}
                        </Typography>
                    </Box>

                    <Box>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <MoreVertIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '10px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={() => { onDownload(); handleCloseUserMenu(); }}>
                                <Typography sx={{ display: 'flex', alignItems: 'center' }} textAlign="center">
                                    <DownloadIcon sx={{ mr: 1 }} fontSize='1rem' />
                                    <span style={{ fontSize: '0.9rem' }}>Download</span>
                                </Typography>
                            </MenuItem>
                            {!sharedFiles && <MenuItem sx={{ display: 'flex', alignItems: 'center' }} onClick={() => { handleOpenShareModal(); handleCloseUserMenu() }}>
                                <Typography textAlign="center">
                                    <ShareIcon sx={{ mr: 1 }} fontSize='1rem' />
                                    <span style={{ fontSize: '0.9rem' }}>Share</span>
                                </Typography>
                            </MenuItem>}
                            {!sharedFiles && <MenuItem sx={{ display: 'flex', alignItems: 'center' }} onClick={handleDeleteClick}>
                                <Typography textAlign="center">
                                    <DeleteIcon sx={{ mr: 1 }} fontSize='1rem' />
                                    <span style={{ fontSize: '0.9rem' }}>Delete</span>
                                </Typography>
                            </MenuItem>}
                            <MenuItem sx={{ display: 'flex', alignItems: 'center' }} onClick={handleOpenSharedWith}>
                                <Typography textAlign="center">
                                    <FolderSharedIcon sx={{ mr: 1 }} fontSize='1rem' />
                                    <span style={{ fontSize: '0.9rem' }}>Shared With</span>
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
                <Box>
                    {isModalOpen && <ModalViewer fileurl={fileurl} fileType={fileType} onClose={closeModal} />}
                </Box>
                <Box>
                    {isShareModalOpen && <ShareFileModal
                        open={isShareModalOpen}
                        onClose={handleCloseShareModal}
                        onShare={handleShareFile}
                        fileId={fileId}
                        setMsg={setMsg}
                    />}
                </Box>
                <Box>
                    {isSharedWithOpen && <ShareWithModal fileId={fileId} onClose={handleCloseSharedWith} />}
                </Box>
                <Box>
                    {isDeleteModalOpen && <DeleteConfirmationModal
                        open={isDeleteModalOpen}
                        onClose={handleCloseModal}
                        onConfirm={handleConfirmDelete}
                        fileName={fileName}
                    />}
                </Box>
                {/* <Box>
                    <ToastContainer />
                </Box> */}
            </ListItemText>
        </ListItem>
    );
};

const FileList = ({ files, sharedFiles }) => {

   
      
    return (
        <List>
            {files.map((file, index) => (
                <File
                    key={index}
                    fileId={file._id}
                    fileName={file.fileName}
                    fileOwner={file.fileOwner}
                    fileType={file.fileType}
                    fileSize={file.fileSize}
                    fileurl={file.fileurl}
                    sharedFiles={sharedFiles}
                />
            ))}
            
        </List>
        
    );
};

export default FileList;
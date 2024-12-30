import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import './DashHeader.css';
import { useSelector } from 'react-redux';
import InfoPopup from './infopopup';
import {setRender} from '../../reduxStore/state.js'
import {useDispatch} from 'react-redux'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

export default function DashHeader() {

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const picturePath = user.picturePath;
    const dispatch=useDispatch();
    
    const isNonMobileScreens = useMediaQuery("(min-width:820px)");
    const rerender2=useSelector((state)=>state.render);
    console.log(rerender2);
  
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box className='nametag' sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
                alt="User Profile"
                src={`http://localhost:3001/assets/${picturePath}`} // Assuming you have the path to the user's profile picture
                sx={isNonMobileScreens ? { width: 100, height: 100 } : { width: 70, height: 70 }}
            />
            <Box sx={{ marginLeft: isNonMobileScreens ? 2 : 1 }}>
                <Typography sx={isNonMobileScreens ? { fontSize: '1rem', fontWeight: 600 } : { fontSize: '0.9rem', fontWeight: 400 }}>
                    Good Day!!
                </Typography>
                <Typography sx={isNonMobileScreens ? { fontSize: '1.5rem', fontWeight: 600 } : { fontSize: '1.2rem', fontWeight: 400 }}>
                    {user.firstName} {user.lastName}
                </Typography>
            </Box>
        </Box>
    </Box>

    );
}
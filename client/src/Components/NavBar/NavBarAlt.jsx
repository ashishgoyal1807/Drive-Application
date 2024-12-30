import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';
import CssBaseline from '@mui/material/CssBaseline';

const Navbar = () => {
  return (
    <>
      
      <AppBar  sx={{ margin: 0, padding: 0 }} position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            xDrive
          </Typography>
          <AdbIcon />
        </Toolbar>
      </AppBar>
     
    </>
  );
};

export default Navbar;
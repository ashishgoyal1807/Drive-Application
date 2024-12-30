import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { fileTypeFromBuffer } from 'file-type';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                xDrive
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignUpForm() {


    const navigate=useNavigate();
    const [formData, setFormData] = React.useState({ firstName: "", lastName: "", email: "", password: "" });
    const [picturePath, setPicturePath] = React.useState("");
    const [pictureFile, setPictureFile] = React.useState(null);

    const handleChange = (event) => {
        const changeField = event.target.name;
        const changeValue = event.target.value;

        formData[changeField] = changeValue;

        setFormData({ ...formData });
    }

    function isValidEmail(email) {
        // Regular expression for a valid email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        // Test the email against the regex
        return emailRegex.test(email);
      }

    const handleProfilePicture = async (file) => {
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if(!allowedImageTypes.includes(file[0].type))
        {
           return window.alert('Only image files are accepted');
        }
        setPictureFile(file);
        setPicturePath(file[0].path);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        if(!isValidEmail(formData.email))
        {
            return window.alert('Invalid email entered');
        }

        const newFormData={...formData,picturePath:picturePath?picturePath:null,picture:pictureFile?pictureFile[0]:null}

        const formValues = new FormData(); //FormData is used because multer doesn't work with json type form data, it needs multipart form data which FormData provides

        Object.keys(newFormData).map((item)=>{
            formValues.append(item,newFormData[item]);
        })

        
        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
      
              method: "POST",
              body: formValues
            }
          );

          const response=await savedUserResponse.json();
          console.log(response);
          navigate('/');

    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{marginBottom:6}}>
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleChange}
                                    value={formData.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={handleChange}
                                    value={formData.lastName}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    value={formData.password}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box
                                    gridColumn="span 1"
                                    border={`1px solid gray`}
                                    borderRadius="5px"
                                    p="1rem"
                                    cursor="pointer"
                                >
                                    <Dropzone
                                        name="picture"
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={handleProfilePicture}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <Box
                                                    border={`2px dashed gray`}
                                                    p="1rem"
                                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                                    {...getRootProps()}
                                                >
                                                    <input {...getInputProps()} />
                                                    {!picturePath ? (
                                                        <p>Add Picture Here</p>
                                                    ) : (
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <Typography>{picturePath}</Typography>
                                                            <EditOutlinedIcon />
                                                        </Box>
                                                    )}
                                                </Box>
                                            </section>
                                        )}
                                    </Dropzone>
                                </Box>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link onClick={()=>{navigate('/')}} style={{ cursor: 'pointer' }} variant="body2">
                                    {"Already have an account?"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );


}
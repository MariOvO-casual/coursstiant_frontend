import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

function PiazzaAccountBind() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, severity: '', message: '' });

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://lax.nonev.win:5500/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
      });
      const data = await response.json();
      if (response.ok) {
        setAlert({ open: true, severity: 'success', message: 'Account successfully bound!' });
      } else {
        setAlert({ open: true, severity: 'error', message: data.message || 'Failed to bind account.' });
      }
    } catch (error) {
      setAlert({ open: true, severity: 'error', message: 'An error occurred. Please try again.' });
    }
    setLoading(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Please enter your Piazza account details to bind your account.
      </Typography>
      <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
        <InputLabel htmlFor="input-username">Username</InputLabel>
        <Input
          id="input-username"
          value={username}
          onChange={handleUsernameChange}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
        <InputLabel htmlFor="input-password">Password</InputLabel>
        <Input
          id="input-password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          startAdornment={
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        {loading ? <CircularProgress size={24} /> : 'Bind Account'}
      </Button>
        <Snackbar 
        open={alert.open} 
        autoHideDuration={5000} // Auto-hide after 5 seconds
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position the Snackbar at the top-center
        >
        <Alert 
            onClose={handleClose} 
            severity={alert.severity} 
            sx={{ width: '100%' }}
        >
            {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default PiazzaAccountBind;
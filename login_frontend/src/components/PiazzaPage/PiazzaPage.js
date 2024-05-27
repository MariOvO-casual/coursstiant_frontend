import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PageLayout from '../PageLayout/PageLayout';

import PiazzaAccountBind from './components/PiazzaAccountBind'; 
import CourseCards from './components/CourseCards';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function PiazzaPage() {
  const [isBound, setIsBound] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Simulate an API call to check if an account is bound
  useEffect(() => {
    const checkAccountBinding = async () => {
      // API call would go here
      // For example: const response = await fetch('/api/check-binding');
      // const data = await response.json();
      // Mock response:
      const data = { isBound: false, email: 'liuruiya@usc.edu', password: 'mario0727' }; // Simulate a bound account

      setIsBound(data.isBound);
      setEmail(data.email);
      setPassword(data.password);
    };

    checkAccountBinding();
  }, []);

  const unbindAccount = () => {
    // Call API to unbind the account
    console.log("Unbinding the account...");
    setIsBound(false);
    setEmail('');
  };

  return (
    <PageLayout>
        <Box sx={{ flexGrow: 1, height: '100vh' }}> 
          <Button variant="contained" onClick={isBound ? unbindAccount : handleOpen}>
            {isBound ? 'Unbind' : 'Bind Account'}
          </Button>
          {isBound && (
            <Typography sx={{ mt: 1 }}> 
            Bound Email: {email}
            </Typography>
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <PiazzaAccountBind />
            </Box>
          </Modal>
          <Box>
            <CourseCards email={email} password={password} />
          </Box>
        </Box>
    </PageLayout>
        
  );
}

export default PiazzaPage;
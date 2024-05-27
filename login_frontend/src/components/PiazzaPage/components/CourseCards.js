import React, { useState, useEffect } from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box'; 
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };


const CourseCards = ({ email, password }) => {
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    // Start Bot API
    const [userType, setUserType] = useState('student');
    const [embedKnowledge, setEmbedKnowledge] = useState(true);
    // start Bot Alert
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await fetch(`http://lax.nonev.win:5500/users/${encodeURIComponent(email)}/courses/all`);
          const data = await response.json();
          setCourses(data);
        } catch (error) {
          console.error('Failed to fetch courses:', error);
        }
      };
  
      fetchCourses();
    }, [email]);
  
    const handleOpen = (course) => {
      setSelectedCourse(course);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const startBot = async () => {
      setSnackbarOpen(true);
      setLoading(true);
      try {
        const response = await fetch(`http://lax.nonev.win:5505/start/${selectedCourse.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            embedding: embedKnowledge,
            user_type: userType[0]
          }),
        });

        setLoading(false);
        setOpen(false);

        if (!response.ok) throw new Error('Failed to start the bot');
        setAlertMessage('Bot started successfully!');
        setAlertSeverity('success');
      } catch (error) {
        setAlertMessage(`Failed to start the bot: ${error.message}`);
        setAlertSeverity('error');
      }
    };
  
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
        {courses.map(course => (
              <Card key={course.id} sx={{ width: 320 }} onClick={() => handleOpen(course)}>
                <CardContent>
                  <Typography level="body1" sx={{ fontWeight: 'bold' }}>
                {course.name}
              </Typography>
              <Typography level="body2" sx={{ color: 'text.secondary' }}>
                Status: Running
              </Typography>
            </CardContent>
          </Card>

        ))}
        {/* Start bot pop-up window */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              Start Bot for {selectedCourse?.name}
            </Typography>
            {/* choose role */}
            <Box>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                Respond as a student or an instructor? 
              </Typography>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button color={userType === 'student' ? 'primary' : 'inherit'} onClick={() => setUserType('student')}>
                  Student
                </Button>
                <Button color={userType === 'instructor' ? 'primary' : 'inherit'} onClick={() => setUserType('instructor')}>
                  Instructor
                </Button>
              </ButtonGroup>
            </Box>
            
            {/* choose embedding */}
            <Box> 
              <Typography id="modal-description" sx={{ mt: 2 }}>
                Add all posts to knowledge base?
              </Typography>
              <ButtonGroup variant="contained" aria-label="outlined primary embed button group">
                <Button color={embedKnowledge === true ? 'primary' : 'inherit'} onClick={() => setEmbedKnowledge(true)}>
                  Yes
                </Button>
                <Button color={embedKnowledge === false ? 'primary' : 'inherit'} onClick={() => setEmbedKnowledge(false)}>
                  No
                </Button>
              </ButtonGroup>
            </Box>
            
            {/* start button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={startBot}>Start Bot</Button>
            </Box>
          </Box>
        </Modal>
        {/* Start bot alert */}
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{
              position: 'fixed', // Use 'fixed' to position relative tzo the viewport
              top: 20, // Distance from the bottom of the viewport
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'auto', // Auto width based on content size
              zIndex: 1400 // Make sure it's above most other components
            }}
          >
          <Alert
            severity={alertSeverity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setSnackbarOpen(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ width: '100%' }}
          >
            {loading ? (
              <Box display="flex" alignItems="center">
                <CircularProgress size={24} sx={{ mr: 2 }} />
                Loading, please wait...
              </Box>
            ) : (
              alertMessage
            )}
          </Alert>
        </Snackbar>
      </div>
    );
  };

export default CourseCards;
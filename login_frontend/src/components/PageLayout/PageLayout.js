import React from 'react';
import Box from '@mui/material/Box';

const PageLayout = ({ children }) => {
  return (
    <Box sx={{
      margin: 3, // Adjust margin as needed
      padding: 2, // Optional padding inside the frame
      border: '1px solid #ccc', // Optional border
      borderRadius: '10px', // Adjust borderRadius for rounded corners
      height: 'calc(100vh - 48px)', // Adjust height taking into account navbar height if any
      boxSizing: 'border-box', // Include padding and border in the element's total width and height
      backgroundColor: 'white', // Optional background color
      boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' // Optional shadow for depth
    }}>
      {children}
    </Box>
  );
};

export default PageLayout;
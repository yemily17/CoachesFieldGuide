import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SearchBar from './SearchBar'; // Import SearchBar
import Box from '@mui/material/Box'; // Import Box for spacing

function CardComponent() {
  return (
    <Card sx={{
      position: 'absolute',
      top: 20,
      left: 20,
      bottom: 20, // Add bottom padding
      zIndex: 1000, // Ensure card is above the map
      width: 400,
      height: 'auto', // Adjust height to fill space
      overflowY: 'auto',
      p: 2,
    }}>
      <CardContent>
        <Box sx={{ mt: 2 }} /> {/* Add spacing below SearchBar */}
        <Typography variant="h5" component="div">
          Hackathon/City Info
        </Typography>
        <Typography variant="body2" color="text.secondary">
          More information about selected hackathons or cities will appear here.
        </Typography>
        <SearchBar /> {/* Render SearchBar */}
      </CardContent>
    </Card>
  );
}

export default CardComponent;

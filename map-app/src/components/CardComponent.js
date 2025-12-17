import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SearchBar from './SearchBar';
import Box from '@mui/material/Box';
import hackathons from '../fixtures/hackathons'; // Corrected import path

function CardComponent() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredHackathons = hackathons.filter((hackathon) =>
    hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hackathon.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card sx={{
      position: 'absolute',
      top: 20,
      left: 20,
      bottom: 20,
      zIndex: 1000,
      width: 300,
      height: 'auto',
      overflowY: 'auto',
      p: 2,
    }}>
      <CardContent>
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <Box sx={{ mt: 2 }} />

        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
          Upcoming Hackathons
        </Typography>
        
        {filteredHackathons.map((hackathon) => (
          <Card key={hackathon.id} sx={{ mb: 2, bgcolor: 'background.paper' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {hackathon.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {hackathon.city}
              </Typography>
            </CardContent>
          </Card>
        ))}

      </CardContent>
    </Card>
  );
}

export default CardComponent;

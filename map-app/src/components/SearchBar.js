import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
// Removed Box import as it's no longer needed for styling within CardComponent
// import Box from '@mui/material/Box'; 

function SearchBar() {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search for hackathon or city..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;

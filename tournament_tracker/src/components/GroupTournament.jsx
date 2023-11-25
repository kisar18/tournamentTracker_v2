import { Box, Button, Typography } from '@mui/material';
import React from 'react';

function GroupTournament() {
  return (
    <Box>
      <Typography variant='h4'>Groups</Typography>
      <FormControl sx={{ minWidth: "100px" }} >
        <Select>
          <MenuItem>Group NUMBER</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default GroupTournament;
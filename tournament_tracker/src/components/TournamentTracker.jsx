import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Textarea from '@mui/joy/Textarea';
import { ENDPOINTS, createAPIEndpoint } from '../api';
import { useLocation } from 'react-router-dom';

function TournamentTracker() {
  const [tournament, setTournament] = useState({});
  const location = useLocation();

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.tournament)
      .getById(location.state.tournamentId)
      .then(res => {
        setTournament(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "70vw", border: "1px solid black", borderRadius: "15px", p: 3 }}>
      <Box>
        <Box>
          {tournament &&
            <h3>Tournament: {tournament.tournamentName}</h3>
          }
        </Box>
        <Box sx={{ display: "flex", mt: 2 }}>
          <h4>Round</h4>
          <FormControl fullWidth >
            <Select
              id="round"
              name="round"
              value=""
              sx={{ ml: 3 }}
            >
              <MenuItem value="a">---</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", mt: 2 }}>
          <h4>Unplayed only</h4>
          <FormControlLabel
            control={<Checkbox sx={{ ml: 3 }} />}
            name='unplayed'
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Textarea
            name="matchupListBox"
            minRows={10}
            placeholder='matchupListBox'
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
        <Box>
          <h4>Sample team 1</h4>
          <Box display={{ display: "flex" }}>
            <h4>Score</h4>
            <TextField variant="outlined" sx={{ ml: 3 }} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <h4>VS</h4>
          <Button variant="outlined">Score</Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <h4>Sample team 2</h4>
          <Box display={{ display: "flex" }}>
            <h4>Score</h4>
            <TextField variant="outlined" sx={{ ml: 3 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TournamentTracker;
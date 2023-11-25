import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ENDPOINTS, createAPIEndpoint } from '../api';
import { useNavigate } from 'react-router-dom';

function TournamentDashboard() {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.tournament)
      .getAll()
      .then(res => {
        setTournaments(res.data);
        setSelectedTournament(res.data[0]);
      })
      .catch(err => console.log(err));
  }, []);

  const handleLoadTournament = (_id) => {
    navigate("/tournamentTracker", {
      state: {
        tournamentId: _id,
      }
    });
  };

  return (
    <Box sx={{ border: "1px solid black", borderRadius: "15px", p: 3 }}>
      <h2>Tournament dashboard</h2>
      <h3>Load existing tournament</h3>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <Select
          id="tournaments"
          name="tournaments"
          size='small'
          value={selectedTournament}
          onChange={e => { setSelectedTournament(e.target.value); }}
        >
          {tournaments && tournaments.map((tournament) => (
            <MenuItem key={tournament._id} value={tournament}>{tournament.tournamentName}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: "center" }}>
        <Button size='small' variant="outlined" sx={{ mt: 2 }} onClick={() => handleLoadTournament(selectedTournament._id)}>Load tournament</Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: "center" }}>
        <Button size='medium' variant="outlined" sx={{ mt: 2 }} onClick={() => navigate("/createTournament")}>Create tournament</Button>
      </Box>
    </Box>
  );
}

export default TournamentDashboard;
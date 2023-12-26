import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ENDPOINTS, createAPIEndpoint } from '../api';
import { useLocation, useNavigate } from 'react-router-dom';

function TeamsEntryFee() {
  const [tournament, setTournament] = useState({});
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await createAPIEndpoint(ENDPOINTS.tournament).getById(location.state.tournamentId);

      setTournament(res.data);
      setTeams(res.data.teams);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTeamFeeSubmit = async (tName) => {
    try {
      const response = await createAPIEndpoint(ENDPOINTS.tournament).putEntryFee(location.state.tournamentId, { teamName: tName });

      if (response.status === 200) {
        fetchData();
        console.log('Entry fee updated successfully');
      } else {
        console.error('Failed to update scores');
      }
    } catch (error) {
      console.error('Error updating scores:', error);
    }
  };

  const handleLoadTournament = (_id) => {
    navigate("/tournamentTracker", {
      state: {
        tournamentId: _id,
      }
    });
  };

  if (isLoading) {
    return <Box>
      <Typography variant='h2' sx={{ mt: 5 }}>Loading list of teams</Typography>
    </Box>;
  }

  return (
    <Box>
      <TableContainer component={Paper} sx={{ border: "1px solid black" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ fontWeight: "bold" }}>Team / Player Name</TableCell>
              <TableCell align='center' sx={{ fontWeight: "bold" }}>Payed Entry Fee</TableCell>
              <TableCell align='center' sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams && teams.map((team, index) => (
              <TableRow key={index}>
                <TableCell align='center'>{team.teamName}</TableCell>
                {team.payedEntryFee === true ?
                  <TableCell align='center' sx={{ color: "green", fontWeight: "bold" }}>Yes</TableCell> :
                  <TableCell align='center' sx={{ color: "red", fontWeight: "bold" }}>No</TableCell>
                }
                <TableCell align='center'>
                  {team.payedEntryFee === true ?
                    <Button variant='contained' onClick={() => handleTeamFeeSubmit(team.teamName)}>Un-pay</Button> :
                    <Button variant='contained' onClick={() => handleTeamFeeSubmit(team.teamName)}>Pay</Button>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: "center", pb: 4 }}>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => handleLoadTournament(location.state.tournamentId)}>Back to tournament rounds</Button>
      </Box>
    </Box>
  );
}

export default TeamsEntryFee;
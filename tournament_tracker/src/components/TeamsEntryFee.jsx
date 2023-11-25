import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ENDPOINTS, createAPIEndpoint } from '../api';
import { useLocation } from 'react-router-dom';

function TeamsEntryFee() {
  const [tournament, setTournament] = useState({});
  const [teams, setTeams] = useState([]);
  const location = useLocation();

  const fetchData = async () => {
    try {
      const res = await createAPIEndpoint(ENDPOINTS.tournament).getById(location.state.tournamentId);
      console.log(res.data);

      setTournament(res.data);
      setTeams(res.data.teams);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <TableContainer component={Paper} sx={{ border: "1px solid black" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ fontWeight: "bold" }}>Team / Player Name</TableCell>
              <TableCell align='center' sx={{ fontWeight: "bold" }}>Payed Entry Fee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams && teams.map((team, index) => (
              <TableRow key={index}>
                <TableCell align='center'>{team.teamName}</TableCell>
                {team.payedEntryFee === true ?
                  <TableCell align='center'>Yes</TableCell> :
                  <TableCell align='center'>No</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TeamsEntryFee;
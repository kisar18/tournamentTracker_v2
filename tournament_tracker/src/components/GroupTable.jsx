import { Box, Button, FormControl, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ENDPOINTS, createAPIEndpoint } from '../api';

function GroupTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState({});
  const [groups, setGroups] = useState([]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [groupTeams, setGroupTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tournamentFinished, setTournamentFinished] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await createAPIEndpoint(ENDPOINTS.tournament).getById(location.state.tournamentId);
      setTournament(res.data);
      setGroups(res.data.groups);
      setTournamentFinished(res.data.rounds.every(round =>
        round.every(r => r.finished === true)
      ));
      setSelectedGroupIndex(prevIndex => Math.min(prevIndex, res.data.groups.length - 1));
      setGroupTeams(res.data.groups[selectedGroupIndex]);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedGroupIndex >= 0 && selectedGroupIndex < groups.length) {
      setGroupTeams(groups[selectedGroupIndex]);
    }
  }, [selectedGroupIndex, groups]);

  const handleLoadTournament = (_id) => {
    navigate("/tournamentTracker", {
      state: {
        tournamentId: _id,
      }
    });
  };

  if (isLoading) {
    return <Box>
      <Typography variant='h2' sx={{ mt: 5 }}>Loading groups</Typography>
    </Box>;
  }

  return (
    <Box>
      <Box>
        <Typography variant='h5' sx={{ textAlign: "center" }}>Groups</Typography>
        <FormControl sx={{ minWidth: "100px" }} >
          <Select
            onChange={e => { setSelectedGroupIndex(e.target.value); }}
            value={selectedGroupIndex}>
            {groups && groups.map((group, index) => (
              <MenuItem key={index} value={index}>Group {index + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant='h6' sx={{ textAlign: "center", my: 3 }}>Group {selectedGroupIndex + 1}</Typography>
      {tournamentFinished &&
        <Typography variant='h6' sx={{ textAlign: "center", my: 3, color: "lightblue", fontWeight: "bold" }}>Groups finished</Typography>
      }
      <TableContainer component={Paper} sx={{ border: "1px solid black" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ fontWeight: "bold" }}>Rank</TableCell>
              <TableCell align='center' sx={{ fontWeight: "bold" }}>Team / Player</TableCell>
              <TableCell align='center' sx={{ fontWeight: "bold" }}>Games won</TableCell>
              <TableCell align='center' sx={{ fontWeight: "bold" }}>Sets won</TableCell>
              <TableCell align='center' sx={{ fontWeight: "bold" }}>Sets lost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupTeams && groupTeams
              .sort((a, b) => {
                // Compare by gamesWon
                if (a.gamesWon !== b.gamesWon) {
                  return b.gamesWon - a.gamesWon;
                }

                // If gamesWon are equal, compare by pointsWon
                if (a.pointsWon !== b.pointsWon) {
                  return b.pointsWon - a.pointsWon;
                }

                // If pointsWon are also equal, compare by pointsLost
                return a.pointsLost - b.pointsLost;
              })
              .map((team, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{index + 1}</TableCell>
                  <TableCell align='center'>{team.teamName}</TableCell>
                  <TableCell align='center'>{team.gamesWon}</TableCell>
                  <TableCell align='center'>{team.pointsWon}</TableCell>
                  <TableCell align='center'>{team.pointsLost}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: "center" }}>
        <Button variant="outlined" sx={{ mt: 2, pb: 4 }} onClick={() => handleLoadTournament(location.state.tournamentId)}>Back to tournament rounds</Button>
      </Box>
    </Box>
  );
}

export default GroupTable;
import { Box, Button, FormControl, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ENDPOINTS, createAPIEndpoint } from '../api';

function TournamentRounds() {
  const [tournament, setTournament] = useState({});
  const [rounds, setRounds] = useState([]);
  const [roundMatchups, setRoundMatchups] = useState([]);
  const [selectedRound, setSelectedRound] = useState(0);
  const [scoreType] = useState(["---", "3 : 0", "3 : 1", "3 : 2", "0 : 3", "1 : 3", "2 : 3"]);
  const [matchupScores, setMatchupScores] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await createAPIEndpoint(ENDPOINTS.tournament).getById(location.state.tournamentId);
      setTournament(res.data);
      setRounds(res.data.rounds);
      if (selectedRound === 0) {
        setSelectedRound(res.data.rounds[0][0].round);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setRoundMatchups(rounds[selectedRound - 1]);
  }, [rounds, selectedRound]);

  useEffect(() => {
    if (roundMatchups && roundMatchups.length > 0) {
      const initialScores = roundMatchups.map(matchup => {
        const numericScore = parseInt(matchup.score[0]);
        return isNaN(numericScore) ? '---' : matchup.score.toString();
      });

      setMatchupScores(initialScores);
    }
  }, [roundMatchups]);

  const handleScoreChange = (index, newScore) => {
    const newMatchupScores = [...matchupScores];
    newMatchupScores[index] = newScore;
    setMatchupScores(newMatchupScores);
  };

  const handleScoresSubmit = async () => {
    for (let i = 0; i < roundMatchups.length; i++) {
      if (matchupScores[i] !== '---' && matchupScores[i] !== roundMatchups[i].score) {
        const requestBody = {
          round: selectedRound - 1,
          matchupIndex: i,
          score: matchupScores[i],
        };

        try {
          const response = await createAPIEndpoint(ENDPOINTS.tournament).put(location.state.tournamentId, requestBody);

          if (response.status === 200) {
            fetchData();
            console.log('Scores updated successfully');
          } else {
            console.error('Failed to update scores');
          }
        } catch (error) {
          console.error('Error updating scores:', error);
        }
      }
    }
  };

  const handleLoadTournamentGroups = (_id) => {
    navigate("/groups", {
      state: {
        tournamentId: _id,
      }
    });
  };

  return (
    <Box sx={{ mt: 4, width: "90%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Typography variant="h6" sx={{ width: "50%", textAlign: "center" }}>Tournament: {tournament.tournamentName}</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", width: "50%" }}>
          <Typography variant="h6" sx={{ width: "40%", textAlign: "center" }}>Rounds</Typography>
          <FormControl sx={{ width: "40%", minWidth: "200px" }} >
            <Select
              id="round"
              onChange={e => { setSelectedRound(e.target.value); }}
              value={selectedRound}
              sx={{ ml: 3 }}
            >
              {rounds && rounds.map((round, index) => (
                <MenuItem key={index} value={round[0].round}>Round: {round[0].round}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>Matchups</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <TableContainer component={Paper} sx={{ border: "1px solid black" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align='center' sx={{ fontWeight: "bold" }}>Team / Player 1</TableCell>
                  <TableCell align='center' sx={{ fontWeight: "bold" }}>Team / Player 2</TableCell>
                  <TableCell align='center' sx={{ fontWeight: "bold" }}>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roundMatchups && roundMatchups.map((matchup, index) => (
                  <TableRow key={index}>
                    <TableCell align='center'>{matchup.team1}</TableCell>
                    <TableCell align='center'>{matchup.team2}</TableCell>
                    <TableCell align='center'>
                      <FormControl sx={{ minWidth: "100px" }} >
                        <Select
                          value={matchupScores[index] || ""}
                          onChange={e => handleScoreChange(index, e.target.value)}
                        >
                          {scoreType.map((score, index) => (
                            <MenuItem key={index} value={score}>{score}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ display: "flex", mt: 3, justifyContent: "center" }}>
          <Button variant='contained' onClick={handleScoresSubmit}>Save results</Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: "center" }}>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={() => handleLoadTournamentGroups(location.state.tournamentId)}>Load tournament groups</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TournamentRounds;
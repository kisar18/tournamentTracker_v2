import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import '../App.css';
import { ENDPOINTS, createAPIEndpoint } from '../api';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useCreateTournamentContext } from '../hooks/useCreateTournamentContext';

const initialTournamentTeams = JSON.parse(localStorage.getItem('tournamentTeams')) || [];

function CreateTournament() {

  const [teams, setTeams] = useState([]);
  const [tournamentName, setTournamentName] = useState("");
  const [entryFee, setEntryFee] = useState(0);
  const [prizes, setPrizes] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [tournamentTeams, setTournamentTeams] = useState(initialTournamentTeams);
  const [selectedTeamInTournamentTeams, setSelectedTeamInTournamentTeams] = useState(null);
  const [selectedTournamentPrize, setSelectedTournamentPrize] = useState(null);
  const navigate = useNavigate();
  const { state, dispatch } = useCreateTournamentContext();

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.team)
      .getAll()
      .then(res => {
        setTeams(res.data);
        setSelectedTeam(res.data[0].teamName);
      })
      .catch(err => console.log(err));

    if (localStorage.getItem("prizes") !== null) {
      setPrizes(JSON.parse(localStorage.getItem('prizes')));
    }
  }, []);

  const createTournament = e => {
    e.preventDefault();
    createAPIEndpoint(ENDPOINTS.tournament)
      .post({ tournamentName: tournamentName, entryFee: entryFee })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  const addTeamToTournament = () => {
    const uniqueTeams = new Set(tournamentTeams);
    uniqueTeams.add(selectedTeam);
    setTournamentTeams([...uniqueTeams]);
    dispatch({ type: 'SET_TEAMS', payload: tournamentTeams });
  };

  useEffect(() => {
    localStorage.setItem('tournamentTeams', JSON.stringify(tournamentTeams));
  }, [tournamentTeams]);

  useEffect(() => {
    localStorage.setItem('prizes', JSON.stringify(prizes));
  }, [prizes]);

  const selectLineInTournamentTeams = (index) => {
    if (index !== selectedTeamInTournamentTeams) {
      setSelectedTeamInTournamentTeams(index);
    }
    else {
      setSelectedTeamInTournamentTeams(null);
    }
  };

  const selectLineInTournamentPrizes = (index) => {
    if (index !== selectedTournamentPrize) {
      setSelectedTournamentPrize(index);
    }
    else {
      setSelectedTournamentPrize(null);
    }
  };

  const deleteTeam = (index) => {
    setTournamentTeams((prevTeams) => {
      const updatedTeams = prevTeams.filter((team, i) => i !== index);
      if (updatedTeams.length === 0) {
        setSelectedTeamInTournamentTeams(null);
      }
      return updatedTeams;
    });
  };

  const deletePrize = (index) => {
    dispatch({
      type: 'REMOVE_PRIZE',
      payload: { index },
    });

    const updatedPrizes = [...state.prizes];
    updatedPrizes.splice(index, 1);
    localStorage.setItem('prizes', JSON.stringify(updatedPrizes));
    setPrizes(updatedPrizes);
  };

  return (
    <Box sx={{ border: "1px solid black", borderRadius: "15px", p: 3, width: "70vw" }}>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Box>
          <Box>
            <h3>Create tournament</h3>
          </Box>
          <Box sx={{ mt: 2 }}>
            <h4 className='smallHeading'>Tournament name</h4>
            <TextField size='small' variant="outlined" fullWidth value={tournamentName} onChange={e => { setTournamentName(e.target.value); }} />
          </Box>
          <Box sx={{ display: "flex", mt: 4 }}>
            <h4 className='smallHeading'>Entry fee</h4>
            <TextField size='small' variant="outlined" sx={{ ml: 3 }} value={entryFee} onChange={e => { setEntryFee(e.target.value); }} />
          </Box>
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <h4 className='smallHeading'>Select team</h4>
              <Link to="/createTeam">Create new</Link>
            </Box>
            <FormControl fullWidth size='small'>
              <Select
                id="tournamentTeams"
                name="tournamentTeams"
                onChange={e => { setSelectedTeam(e.target.value); }}
                value={selectedTeam}
              >
                {teams && teams.map((team) => (
                  <MenuItem key={team._id} value={team.teamName}>{team.teamName}</MenuItem>
                ))
                }
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: "center" }}>
            <Button variant="outlined" onClick={addTeamToTournament}>Add team</Button>
          </Box>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" onClick={() => navigate("/createPrize")}>Create prize</Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
          <Box sx={{ minWidth: "400px" }}>
            <h4 className='smallHeading'>Teams / Players</h4>
            <Box display={{ display: "flex" }}>
              <List sx={{ width: "70%", border: "1px solid black", borderRadius: "5px", p: 0, overflow: "auto", maxHeight: "200px" }}>
                {tournamentTeams.map((team, index) => (
                  <ListItem key={index} disablePadding sx={{
                    borderBottom: '1px solid black',
                    '&:last-of-type': {
                      borderBottom: 'none'
                    },
                    backgroundColor: (theme) =>
                      index === selectedTeamInTournamentTeams ? theme.palette.info.light : 'transparent',
                  }}>
                    <ListItemButton onClick={() => selectLineInTournamentTeams(index)}>
                      <ListItemText primary={team} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" sx={{ ml: 3, width: "30%", height: "50%" }} onClick={() => deleteTeam(selectedTeamInTournamentTeams)}>Delete selected</Button>
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <h4 className='smallHeading'>Prizes</h4>
            <Box display={{ display: "flex" }}>
              <List sx={{ width: "70%", border: "1px solid black", borderRadius: "5px", p: 0, overflow: "auto", maxHeight: "200px" }}>
                {prizes && prizes.map((prize, index) => (
                  <ListItem key={index} disablePadding sx={{
                    borderBottom: '1px solid black',
                    '&:last-of-type': {
                      borderBottom: 'none'
                    },
                    backgroundColor: (theme) =>
                      index === selectedTournamentPrize ? theme.palette.info.light : 'transparent',
                  }}>
                    <ListItemButton onClick={() => selectLineInTournamentPrizes(index)}>
                      <ListItemText primary={prize.prizeName} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" sx={{ ml: 3, width: "30%", height: "50%" }} onClick={() => deletePrize(selectedTournamentPrize)}>Delete selected</Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" sx={{ mt: 3 }} onClick={createTournament}> Create tournament</Button>
      </Box>
    </Box>
  );
}

export default CreateTournament;
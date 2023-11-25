import React, { useState } from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Textarea from '@mui/joy/Textarea';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../App.css';
import { ENDPOINTS, createAPIEndpoint } from '../api';

function CreateTeam() {
  const [teamName, setTeamName] = useState("");

  const createTeam = e => {
    e.preventDefault();
    createAPIEndpoint(ENDPOINTS.team)
      .post({ teamName })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log());
  };

  return (
    <Box sx={{ border: "1px solid black", borderRadius: "15px", width: "50vw", p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Box>
          <Box>
            <h3>Create team</h3>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Box>
              <h4 className='smallHeading'>Team name</h4>
              <TextField size='small' variant="outlined" fullWidth value={teamName} onChange={e => { setTeamName(e.target.value); }} />
            </Box>
            <Box sx={{ display: "flex", mt: 2 }}>
              <h4 className='smallHeading'>Select team member</h4>
            </Box>
            <FormControl fullWidth>
              <Select
                id="teamMembers"
                name="teamMembers"
                size='small'
              >
                <MenuItem value="a">---</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Button size='small' variant="outlined">Add member</Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <h4 className='smallHeading'>Add new member</h4>
          </Box>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <h4 className='smallHeading'>First name</h4>
            <TextField size='small' variant="outlined" sx={{ ml: 2 }} />
          </Box>
          <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
            <h4 className='smallHeading'>Last name</h4>
            <TextField size='small' variant="outlined" sx={{ ml: 2 }} />
          </Box>
          <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
            <h4 className='smallHeading'>Email</h4>
            <TextField size='small' variant="outlined" sx={{ ml: 2 }} />
          </Box>
          <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
            <h4 className='smallHeading'>Phone number</h4>
            <TextField size='small' variant="outlined" sx={{ ml: 2 }} />
          </Box>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Button size='small' variant="outlined">Create member</Button>
          </Box>
        </Box>
        <Box>
          <Textarea
            name="tournamentPlayersListBox"
            minRows={20}
            placeholder='tournamentPlayersListBox'
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: "center" }}>
        <Button size='small' variant="outlined" sx={{ mt: 2 }} onClick={createTeam}> Create team</Button>
      </Box>
    </Box>
  );
}

export default CreateTeam;
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTournamentHelper() {

  const navigate = useNavigate();

  return (
    <Box>
      <TableContainer component={Paper} sx={{ border: "1px solid black" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ fontWeight: "bold" }}>Team / Player Name</TableCell>
              <TableCell align='center' sx={{ fontWeight: "bold" }}>Group</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='center'>Team 1</TableCell>
              <TableCell align='center'>A</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>Team 2</TableCell>
              <TableCell align='center'>B</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>Team 3</TableCell>
              <TableCell align='center'>A</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>Team 4</TableCell>
              <TableCell align='center'>B</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>Team 5</TableCell>
              <TableCell align='center'>A</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>Team 6</TableCell>
              <TableCell align='center'>B</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>Team 7</TableCell>
              <TableCell align='center'>A</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>Team 8</TableCell>
              <TableCell align='center'>B</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: "center", pb: 4 }}>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate("/createTournament")}>Back to tournament creation</Button>
      </Box>
    </Box>
  );
}

export default CreateTournamentHelper;
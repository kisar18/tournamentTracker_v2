import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import '../App.css';
import { useCreateTournamentContext } from '../hooks/useCreateTournamentContext';
import { useNavigate } from 'react-router-dom';

function CreatePrize() {
  const [prizeName, setPrizeName] = useState("");
  const [placeNumber, setPlaceNumber] = useState(0);
  const [placeName, setPlaceName] = useState("");
  const [prizeAmount, setPrizeAmount] = useState(0);
  const [prizePercentage, setPrizePercentage] = useState(0);
  const navigate = useNavigate();

  const { state, dispatch } = useCreateTournamentContext();

  const handleCreatePrize = () => {
    dispatch({
      type: 'ADD_PRIZE',
      payload: {
        prizeName: prizeName,
        placeNumber: placeNumber,
        placeName: placeName,
        prizeAmount: prizeAmount,
        prizePercentage: prizePercentage
      },
    });
  };

  useEffect(() => {
    if (state.prizes && state.prizes.length > 0) {
      localStorage.setItem('prizes', JSON.stringify(state.prizes));
      navigate("/createTournament");
    }
  }, [state.prizes]);

  return (
    <Box sx={{ border: "1px solid black", borderRadius: "15px", p: 3 }}>
      <h3>Create prize</h3>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h4 className='smallHeading'>Prize name</h4>
        <TextField size='small' variant="outlined" sx={{ ml: 2 }} value={prizeName} onChange={e => setPrizeName(e.target.value)} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <h4 className='smallHeading'>Place number</h4>
        <TextField size='small' variant="outlined" sx={{ ml: 2 }} value={placeNumber} onChange={e => setPlaceNumber(e.target.value)} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <h4 className='smallHeading'>Place name</h4>
        <TextField size='small' variant="outlined" sx={{ ml: 2 }} value={placeName} onChange={e => setPlaceName(e.target.value)} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <h4 className='smallHeading'>Prize amount</h4>
        <TextField size='small' variant="outlined" sx={{ ml: 2 }} value={prizeAmount} onChange={e => setPrizeAmount(e.target.value)} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <h4 className='smallHeading'>- or -</h4>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <h4 className='smallHeading'>Prize percentage</h4>
        <TextField size='small' variant="outlined" sx={{ ml: 2 }} value={prizePercentage} onChange={e => setPrizePercentage(e.target.value)} />
      </Box>
      <Box display={{ display: "flex", justifyContent: "center" }}>
        <Button size='small' variant="outlined" onClick={handleCreatePrize}>Create prize</Button>
      </Box>
    </Box>
  );
}

export default CreatePrize;
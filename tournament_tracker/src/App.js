import './App.css';
import CreatePrize from './components/CreatePrize';
import CreateTeam from './components/CreateTeam';
import CreateTournament from './components/CreateTournament';
import TournamentDashboard from './components/TournamentDashboard';
import TournamentRounds from './components/TournamentRounds';
import TournamentTracker from './components/TournamentTracker';
import Box from "@mui/material/Box";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Typography from '@mui/material/Typography';
import GroupTable from './components/GroupTable';

function App() {
  return (
    <BrowserRouter className="App">
      <Typography sx={{ textAlign: "center", mt: 3 }} variant="h4">Tournament tracker</Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Routes>
          <Route exact path='/' element={<TournamentDashboard />} />
          <Route exact path='/tournamentTracker' element={<TournamentRounds />} />
          <Route exact path='/createTournament' element={<CreateTournament />} />
          <Route exact path='/createPrize' element={<CreatePrize />} />
          <Route exact path='/createTeam' element={<CreateTeam />} />
          <Route exact path='/groups' element={<GroupTable />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CreateTournamentContextProvider } from './hooks/useCreateTournamentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CreateTournamentContextProvider>
    <App />
  </CreateTournamentContextProvider>
);

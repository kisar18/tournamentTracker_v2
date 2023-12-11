import React, { createContext, useContext, useReducer } from 'react';

const CreateTournamentContext = createContext();

const initialState = {
  prizes: [],
  tournamentTeams: [],
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRIZE':
      return {
        ...state,
        prizes: [...state.prizes, action.payload],
      };
    case 'SET_TEAMS':
      return {
        tournamentTeams: action.payload
      };
    case 'REMOVE_PRIZE':
      return {
        ...state,
        prizes: state.prizes.filter((_, index) => index !== action.payload.index),
      };
    case 'REMOVE_TEAM':
      return {
        ...state,
        tournamentTeams: state.tournamentTeams.filter((team) => team.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export const CreateTournamentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <CreateTournamentContext.Provider value={{ state, dispatch }}>
      {children}
    </CreateTournamentContext.Provider>
  );
};

export const useCreateTournamentContext = () => {
  return useContext(CreateTournamentContext);
};

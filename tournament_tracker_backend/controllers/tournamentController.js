import mongoose from "mongoose";
import Tournament from "../models/tournamentModel.js";

// Table / Round / Matchups
const tableForGroupOf4 = [[1, 4, 2, 3], [4, 3, 2, 1], [2, 4, 3, 1]];
const tableForGroupOf6 = [[1, 6, 2, 5, 3, 4], [6, 4, 5, 3, 1, 2],
[2, 6, 3, 1, 4, 5], [6, 5, 1, 4, 2, 3], [3, 6, 4, 2, 5, 1]];
const tableForGroupOf8 = [[1, 8, 2, 7, 3, 6, 4, 5],
[8, 5, 6, 4, 7, 3, 1, 2], [2, 8, 3, 1, 4, 7, 5, 6],
[8, 6, 7, 5, 1, 4, 2, 3], [3, 8, 4, 2, 5, 1, 6, 7],
[8, 7, 1, 6, 2, 5, 3, 4], [4, 8, 5, 3, 6, 2, 7, 1]];
const tableForGroupOf10 = [[1, 10, 2, 9, 3, 8, 4, 7, 5, 6],
[10, 6, 7, 5, 8, 4, 9, 3, 1, 2], [2, 10, 3, 1, 4, 9, 5, 8, 6, 7],
[10, 7, 8, 6, 9, 5, 1, 4, 2, 3], [3, 10, 4, 25, 1, 6, 9, 7, 8],
[10, 8, 9, 7, 1, 6, 2, 5, 3, 4], [4, 10, 5, 3, 6, 2, 7, 1, 8, 9],
[10, 9, 1, 8, 2, 7, 3, 6, 4, 5], [5, 10, 6, 4, 7, 3, 8, 2, 9, 1]];
const tableForGroupOf12 = [[1, 12, 2, 11, 3, 10, 4, 9, 5, 8, 6, 7],
[12, 7, 8, 6, 9, 5, 10, 4, 11, 3, 1, 2],
[2, 12, 3, 1, 4, 11, 5, 10, 6, 9, 7, 8],
[12, 8, 9, 7, 10, 6, 11, 5, 1, 4, 2, 3],
[3, 12, 4, 2, 5, 1, 6, 11, 7, 10, 8, 9],
[12, 9, 10, 8, 11, 7, 1, 6, 2, 5, 3, 4],
[4, 12, 5, 3, 6, 2, 7, 1, 8, 11, 9, 10],
[12, 10, 11, 9, 1, 8, 2, 7, 3, 6, 4, 5],
[5, 12, 6, 4, 7, 3, 8, 2, 9, 1, 10, 11],
[12, 11, 1, 10, 2, 9, 3, 8, 4, 7, 5, 6],
[6, 12, 7, 5, 8, 4, 9, 3, 10, 2, 11, 1]];

const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();

    res.status(200).json(tournaments);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTournament = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such a tournament" });
  }

  const tournament = await Tournament.findById(id);

  if (!tournament) {
    return res.status(404).json({ error: "No such a tournament" });
  }

  res.status(200).json(tournament);
};

const createTournament = async (req, res) => {
  const { tournamentName, entryFee, tournamentType, tournamentTeams } = req.body;

  let emptyFields = [];

  if (!tournamentName) {
    emptyFields.push('tournamentName');
  }
  if (!entryFee) {
    emptyFields.push('entryFee');
  }
  if (!tournamentType) {
    emptyFields.push('tournamentType');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    var matchups = [];
    var rounds = [];
    var groups = [];
    let roundedNumberOfTeams;

    if (tournamentType === "Groups") {
      if (tournamentTeams.length % 2 === 0) {
        roundedNumberOfTeams = tournamentTeams.length;
      }
      else {
        roundedNumberOfTeams = tournamentTeams.length + 1;
      }

      var group1 = [];
      var group2 = [];
      groups.push(group1);
      groups.push(group2);

      // Only 2 groups in this version
      for (let i = 0; i < roundedNumberOfTeams; i++) {
        if (tournamentTeams.length !== roundedNumberOfTeams && i === roundedNumberOfTeams - 1) {
          groups[i % 2].push({ teamName: "None", pointsWon: 0, pointsLost: 0, gamesWon: 0 });
        }
        else {
          groups[i % 2].push({ teamName: tournamentTeams[i].teamName, pointsWon: 0, pointsLost: 0, gamesWon: 0 });
        }
      }

      if (roundedNumberOfTeams / groups.length === tableForGroupOf4.length || roundedNumberOfTeams / groups.length === tableForGroupOf4.length + 1) {
        rounds = fillRoundsForGroups(groups, tableForGroupOf4);
      }
      else if (roundedNumberOfTeams / groups.length === tableForGroupOf6.length || roundedNumberOfTeams / groups.length === tableForGroupOf6.length + 1) {
        rounds = fillRoundsForGroups(groups, tableForGroupOf6);
      }
      else if (roundedNumberOfTeams / groups.length === tableForGroupOf8.length || roundedNumberOfTeams / groups.length === tableForGroupOf8.length + 1) {
        rounds = fillRoundsForGroups(groups, tableForGroupOf8);
      }
      else if (roundedNumberOfTeams / groups.length === tableForGroupOf10.length || roundedNumberOfTeams / groups.length === tableForGroupOf10.length + 1) {
        rounds = fillRoundsForGroups(groups, tableForGroupOf10);
      }
      else if (roundedNumberOfTeams / groups.length === tableForGroupOf12.length || roundedNumberOfTeams / groups.length === tableForGroupOf12.length + 1) {
        rounds = fillRoundsForGroups(groups, tableForGroupOf12);
      }
    }
    else if (tournamentType === "Knockout") {
      roundedNumberOfTeams = Math.pow(2, Math.ceil(Math.log2(tournamentTeams.length)));

      for (let i = 0; i < roundedNumberOfTeams / 2; i++) {
        if (roundedNumberOfTeams / 2 + i >= tournamentTeams.length) {
          matchups.push({ round: 1, team1: tournamentTeams[i].teamName, team2: "None", winner: tournamentTeams[i].teamName, score: "None", finished: false });
        }
        else {
          matchups.push({ round: 1, team1: tournamentTeams[i].teamName, team2: tournamentTeams[(roundedNumberOfTeams / 2 + i)].teamName, winner: "None", score: "---", finished: false });

          rounds.push(matchups);
        }
      }
    }
    else {
      res.status(400).json({ error: "Tournament type can be either Groups or Knockout" });
    }

    const existingT = await Tournament.find({ tournamentName });

    if (existingT.length > 0) {
      res.status(400).json({ error: "Tournament with this name already exists" });
    }
    else {
      if (tournamentType === "Groups") {
        const tournament = await Tournament.create({ tournamentName, entryFee, tournamentType, groups: groups, rounds: rounds, teams: tournamentTeams });
        res.status(200).json(tournament);
      }
      else {
        const tournament = await Tournament.create({ tournamentName, entryFee, tournamentType, groups: groups, rounds: [matchups] });
        res.status(200).json(tournament);
      }
    }

  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTournament = async (req, res) => {
  const { id } = req.params;
  const { round, matchupIndex, score } = req.body;

  try {
    const tournament = await Tournament.findById(id);

    // Update scores for the specified matchup
    tournament.rounds[round][matchupIndex].score = score;
    tournament.rounds[round][matchupIndex].finished = true;
    tournament.groups[tournament.rounds[round][matchupIndex].group].forEach(team => {
      if (team.teamName === tournament.rounds[round][matchupIndex].team1) {
        team.pointsWon += parseInt(score[0]);
        team.pointsLost += parseInt(score[4]);
        if (parseInt(score[0]) === 3) {
          tournament.rounds[round][matchupIndex].winner = team.teamName;
          team.gamesWon += 1;
        }
      } else if (team.teamName === tournament.rounds[round][matchupIndex].team2) {
        team.pointsWon += parseInt(score[4]);
        team.pointsLost += parseInt(score[0]);
        if (parseInt(score[4]) === 3) {
          tournament.rounds[round][matchupIndex].winner = team.teamName;
          team.gamesWon += 1;
        }
      }
    });

    await tournament.save();
    res.status(200).json({ message: 'Scores updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTournament = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such a tournament', id });
    }

    const tournament = await Tournament.findOneAndDelete({ _id: id });

    if (!tournament) {
      return res.status(400).json({ error: 'No such a tournament', id });
    }

    res.status(200).json(tournament);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fillRoundsForGroups = (groups, tablePattern) => {
  var matchups = [];
  var rounds = [];
  var firstTeamIndex;
  var secondTeamIndex;
  // Rounds
  for (let i = 0; i < tablePattern.length; i++) {
    // Matchups of rounds
    matchups = [];
    for (let j = 0; j < tablePattern[i].length; j++) {
      firstTeamIndex = tablePattern[i][j] - 1;
      secondTeamIndex = tablePattern[i][j + 1] - 1;
      // Groups
      for (let k = 0; k < groups.length; k++) {
        if (j % 2 == 0) {
          if (groups[k].length !== firstTeamIndex && groups[k].length !== secondTeamIndex) {

            matchups.push({ round: i + 1, team1: groups[k][firstTeamIndex].teamName, team2: groups[k][secondTeamIndex].teamName, winner: "None", score: "---", finished: false, group: k });
          }
        }
      }
    }
    rounds.push(matchups);
  }
  return rounds;
};

export default { getTournaments, getTournament, createTournament, updateTournament, deleteTournament };
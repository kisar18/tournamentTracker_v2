import mongoose, { Schema } from "mongoose";

const tournamentSchema = mongoose.Schema({
  tournamentName: String,
  entryFee: Number,
  tournamentType: String,
  groups: [[{
    teamName: String,
    pointsWon: Number,
    pointsLost: Number,
    gamesWon: Number
  }]],
  rounds: [[{
    round: Number,
    team1: String,
    team2: String,
    winner: String,
    score: String,
    finished: Boolean,
    group: Number
  }]],
  teams: [{
    teamName: String
  }],
  prizes: [{
    prizeName: String,
    placeNumber: Number,
    placeName: String,
    prizeAmount: Number,
    prizePercentage: Number,
  }]
});

export default mongoose.model("Tournament", tournamentSchema);
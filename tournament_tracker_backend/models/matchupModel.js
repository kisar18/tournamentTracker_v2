import mongoose, { Schema } from "mongoose";

const matchupSchema = mongoose.Schema({
  matchupRound: Number,
  winnerTeamId: String
});

export default mongoose.model("Matchup", matchupSchema);
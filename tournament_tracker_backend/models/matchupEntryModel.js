import mongoose, { Schema } from "mongoose";

const matchupEntrySchema = mongoose.Schema({
  teamCompetingId: String,
  score: Number,
  parentMatchupId: Number
});

export default mongoose.model("MatchupEntry", matchupEntrySchema);
import mongoose, { Schema } from "mongoose";

const teamSchema = mongoose.Schema({
  teamName: String,
  teamPlayers: [{
    firstName: String,
    lastName: String,
    emailAddress: String,
    phoneNumber: String,
  }]
});

export default mongoose.model("Team", teamSchema);
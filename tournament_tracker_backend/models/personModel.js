import mongoose, { Schema } from "mongoose";

const personSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  emailAddress: String,
  phoneNumber: String,
});

export default mongoose.model("Person", personSchema);
import Team from "../models/teamModel.js";
import mongoose from "mongoose";

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();

    res.status(200).json(teams);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTeam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such a team" });
  }

  const team = await Team.findById(id);

  if (!team) {
    return res.status(404).json({ error: "No such a team" });
  }

  res.status(200).json(team);
};

const createTeam = async (req, res) => {
  const { teamName } = req.body;

  let emptyFields = [];

  if (!teamName) {
    emptyFields.push('teamName');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields, teamName });
  }

  try {
    const existingTeam = await Team.find({ teamName });

    if (existingTeam.length > 0) {
      res.status(400).json({ error: "Team with this name already exists" });
    }
    else {
      const team = await Team.create({ teamName });
      res.status(200).json(team);
    }
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTeam = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such a team', id });
    }

    const team = await Team.findOneAndUpdate({ _id: id }, {
      ...req.body
    }, { new: true });

    if (!team) {
      return res.status(400).json({ error: 'No such a team', id });
    }

    res.status(200).json(team);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such a team', id });
    }

    const team = await Team.findOneAndDelete({ _id: id });

    if (!team) {
      return res.status(400).json({ error: 'No such a team', id });
    }

    res.status(200).json(team);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { getTeams, getTeam, createTeam, updateTeam, deleteTeam };
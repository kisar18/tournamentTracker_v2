import Prize from "../models/prizeModel.js";
import mongoose from "mongoose";
import Tournament from "../models/tournamentModel.js";

const getPrizes = async (req, res) => {
  try {
    const prizes = await Prize.find();

    res.status(200).json(prizes);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPrize = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such a prize" });
  }

  const prize = await Prize.findById(id);

  if (!prize) {
    return res.status(404).json({ error: "No such a prize" });
  }

  res.status(200).json(prize);
};

const createPrize = async (req, res) => {
  const { prizeName, placeNumber, placeName, prizeAmount, prizePercentage, tournamentId } = req.body;

  let emptyFields = [];

  if (!prizeName) {
    emptyFields.push('prizeName');
  }
  if (!placeNumber) {
    emptyFields.push('placeNumber');
  }
  if (!placeName) {
    emptyFields.push('placeName');
  }
  if (!prizeAmount) {
    emptyFields.push('prizeAmount');
  }
  if (!prizePercentage) {
    emptyFields.push('prizePercentage');
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields, prizeName });
  }

  try {

    const prize = await Prize.create({ prizeName, placeNumber, placeName, prizeAmount, prizePercentage });

    let tournament = await Tournament.findById(tournamentId);
    tournament.prizes.push(prize);
    await tournament.save();

    res.status(200).json({ prize, tournament });
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePrize = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such a prize', id });
    }

    const prize = await Prize.findOneAndUpdate({ _id: id }, {
      ...req.body
    }, { new: true });

    if (!prize) {
      return res.status(400).json({ error: 'No such a prize', id });
    }

    res.status(200).json(prize);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePrize = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such a prize', id });
    }

    const prize = await Prize.findOneAndDelete({ _id: id });

    if (!prize) {
      return res.status(400).json({ error: 'No such a prize', id });
    }

    res.status(200).json(prize);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { getPrizes, getPrize, createPrize, updatePrize, deletePrize };
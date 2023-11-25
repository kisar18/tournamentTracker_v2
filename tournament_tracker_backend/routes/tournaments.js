import express from "express";
import tournamentController from "../controllers/tournamentController.js";

const router = express.Router();

// GET all tournaments
router.get("/", tournamentController.getTournaments);

// GET a single tournament
router.get("/:id", tournamentController.getTournament);

// CREATE a new tournament
router.post("/", tournamentController.createTournament);

// UPDATE a tournament
router.put("/:id/scores", tournamentController.updateTournament);

// DELETE a tournament
router.delete("/:id", tournamentController.deleteTournament);

export default router;
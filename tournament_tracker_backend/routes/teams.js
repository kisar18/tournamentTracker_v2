import express from "express";
import teamController from "../controllers/teamController.js";

const router = express.Router();

// GET all teams
router.get("/", teamController.getTeams);

// GET a single team
router.get("/:id", teamController.getTeam);

// CREATE a new team
router.post("/", teamController.createTeam);

// UPDATE a team
router.patch("/:id", teamController.updateTeam);

// DELETE a team
router.delete("/:id", teamController.deleteTeam);

export default router;
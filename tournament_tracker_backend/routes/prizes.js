import express from "express";
import prizeController from "../controllers/prizeController.js";

const router = express.Router();

// GET all teams
router.get("/", prizeController.getPrizes);

// GET a single team
router.get("/:id", prizeController.getPrize);

// CREATE a new team
router.post("/", prizeController.createPrize);

// UPDATE a team
router.patch("/:id", prizeController.updatePrize);

// DELETE a team
router.delete("/:id", prizeController.deletePrize);

export default router;
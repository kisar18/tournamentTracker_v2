import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import tournamentRoutes from "./routes/tournaments.js";
import teamRoutes from "./routes/teams.js";
import prizeRoutes from "./routes/prizes.js";

// App config
dotenv.config();
const app = express();
const port = process.env.PORT;
const connection_url = process.env.URI;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/tournaments", tournamentRoutes);
app.use("/teams", teamRoutes);
app.use("/prizes", prizeRoutes);

// DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API endpoints
app.get('/', (req, res) => res.status(200).send("Hello world"));

// Listener
app.listen(port, () => console.log(`Listening on port: ${port}`));
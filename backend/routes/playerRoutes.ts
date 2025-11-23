import { Router } from "express";
// import mongoose from "mongoose";
// import { PlayerModel } from "../models/playerModel";
import { listPlayers } from "../controllers/playerController";
import { connectToDatabase } from "../src/mongo"; // assumes you export getDb after connecting

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const season = req.query.season as string | undefined;
    const db = await connectToDatabase();
    const players = await listPlayers(await connectToDatabase(), season);
    res.json(players);
  } catch (e) {
    next(e);
  }
});

/*
// List players (Mongoose)
router.get("/", async (_req, res, next) => {
  try {
    const players = await PlayerModel.find().lean();
    res.json(players);
  } catch (e) {
    next(e);
  }
});

// Create player
router.post("/", async (req, res, next) => {
  try {
    const player = await PlayerModel.create(req.body);
    res.status(201).json(player);
  } catch (e) {
    next(e);
  }
});

// Get one
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid id" });
    const player = await PlayerModel.findById(id);
    if (!player) return res.status(404).json({ error: "Not found" });
    res.json(player);
  } catch (e) {
    next(e);
  }
});

// Update
router.put("/:id", async (req, res, next) => {
  try {
    const player = await PlayerModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!player) return res.status(404).json({ error: "Not found" });
    res.json(player);
  } catch (e) {
    next(e);
  }
});

// Delete
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await PlayerModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});
*/

export default router;
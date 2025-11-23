import { Router } from "express";
import { listItems, createItem } from "../controllers/itemController";
import { connectToDatabase } from "../src/mongo";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const items = await listItems(await connectToDatabase());
    res.json(items);
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const doc = await createItem(await connectToDatabase(), req.body);
    res.status(201).json(doc);
  } catch (e) { next(e); }
});

export default router;
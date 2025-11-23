import express from "express";
import itemRoutes from "../routes/itemRoutes";
import playerRoutes from "../routes/playerRoutes";
import { errorHandler } from "../middleware/errorHandler";

const app = express();
app.use(express.json());

app.use("/items", itemRoutes);
app.use("/players", playerRoutes);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use(errorHandler);

export default app;
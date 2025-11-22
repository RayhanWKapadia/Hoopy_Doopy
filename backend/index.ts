import express from "express";
import { connectToDatabase } from "./src/mongo";

const app = express();
app.use(express.json());

let db: any;

app.get("/items", async (req, res) => {
  const items = await db.collection("items").find().toArray();
  res.json(items);
});

const startServer = async () => {
  try {
    db = await connectToDatabase();

    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();


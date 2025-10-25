import express from 'express';
import { pool } from './db';
import dotenv from "dotenv"
import { router }  from "./router"
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

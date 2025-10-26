import { Request, Response } from 'express';
import { pool } from '../db';

export const getAllPlayers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM player_stats;")
    res.json(result)
  } catch (err) {
    console.error('Error fetching players:', err);
    res.status(500).json({ error: 'Error fetching players' });
  }
};

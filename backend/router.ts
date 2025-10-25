import express from 'express';
import { pool } from './db';
import dotenv from "dotenv"
dotenv.config();


export const router = express.Router();

router.get("/", (req, res) => {
  res.send("Wiki home page");
});

router.get("/about", (req, res) => {
  res.send("About this wiki");
});


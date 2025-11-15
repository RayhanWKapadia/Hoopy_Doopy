<<<<<<< HEAD
import { Knex } from "knex";
import fs from "fs";
import path from "path";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations",
      extension: "ts",
=======
import dotenv from 'dotenv';
import type { Knex } from 'knex';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: './migrations',
>>>>>>> 39a0ddd4957ec74e9fe672e8c433c1ce344b576f
    },
  },
};

<<<<<<< HEAD
export async function seed(knex: Knex): Promise<void> {
  await knex("player_stats").del();

  const filePath = path.resolve(__dirname, "../data/player_stats.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const lines = fileContent.trim().split("\n");

  const headers = lines[0].split(",");

  const records = lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: any = {};
    headers.forEach((header, i) => {
      obj[header] = values[i];
    });
    return {
      rk: parseInt(obj.Rk),
      player: obj.Player,
      age: parseInt(obj.Age),
      team: obj.Team,
      pos: obj.Pos,
      g: parseInt(obj.G),
      gs: parseInt(obj.GS),
      mp: parseFloat(obj.MP),
      fg: parseFloat(obj.FG),
      fga: parseFloat(obj.FGA),
      fg_pct: parseFloat(obj["FG%"]),
      three_p: parseFloat(obj["3P"]),
      three_pa: parseFloat(obj["3PA"]),
      three_pct: parseFloat(obj["3P%"]),
      two_p: parseFloat(obj["2P"]),
      two_pa: parseFloat(obj["2PA"]),
      two_pct: parseFloat(obj["2P%"]),
      efg_pct: parseFloat(obj["eFG%"]),
      ft: parseFloat(obj.FT),
      fta: parseFloat(obj.FTA),
      ft_pct: parseFloat(obj["FT%"]),
      orb: parseFloat(obj.ORB),
      drb: parseFloat(obj.DRB),
      trb: parseFloat(obj.TRB),
      ast: parseFloat(obj.AST),
      stl: parseFloat(obj.STL),
      blk: parseFloat(obj.BLK),
      tov: parseFloat(obj.TOV),
      pf: parseFloat(obj.PF),
      pts: parseFloat(obj.PTS),
      awards: obj.Awards,
      player_additional: obj["Player-additional"],
    };
  });

  await knex("player_stats").insert(records);
}

=======
>>>>>>> 39a0ddd4957ec74e9fe672e8c433c1ce344b576f
export default config;

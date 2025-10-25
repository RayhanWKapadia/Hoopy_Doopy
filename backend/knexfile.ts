import { Knex } from "knex";
import fs from "fs";
import path from "path";

export async function seed(knex: Knex): Promise<void> {
  // 1. Clear existing data
  await knex("player_stats").del();

  // 2. Read the txt file
  const filePath = path.resolve(__dirname, "../data/player_stats.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // 3. Split into rows
  const lines = fileContent.trim().split("\n");

  // 4. Extract headers
  const headers = lines[0].split(",");

  // 5. Map each row to an object
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

  // 6. Insert into database
  await knex("player_stats").insert(records);
}

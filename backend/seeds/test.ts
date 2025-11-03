import type { Knex } from "knex";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper functions to safely parse numbers or return null
const parseIntOrNull = (val: string) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? null : parsed;
};
const parseFloatOrNull = (val: string) => {
  const parsed = parseFloat(val);
  return isNaN(parsed) ? null : parsed;
};

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("player_stats").del();

  const filePath = path.join(__dirname, "../2024-2025.txt"); // Assuming the file is in the root
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

  const allRecords = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // Filter out the 'League Average' row at the end of the file
  const records = allRecords.filter(
    (record: any) => record.Player !== "League Average"
  );

  const playersToInsert = records.map((record: any) => ({
    rk: parseIntOrNull(record.Rk),
    player_name: record.Player || null,
    age: parseIntOrNull(record.Age),
    team: record.Team || null,
    position: record.Pos || null,
    games_played: parseIntOrNull(record.G),
    games_started: parseIntOrNull(record.GS),
    minutes_played_pg: parseFloatOrNull(record.MP),
    field_goals_pg: parseFloatOrNull(record.FG),
    field_goal_attempts_pg: parseFloatOrNull(record.FGA),
    field_goal_percentage: parseFloatOrNull(record["FG%"]),
    three_pointers_pg: parseFloatOrNull(record["3P"]),
    three_pointer_attempts_pg: parseFloatOrNull(record["3PA"]),
    three_pointer_percentage: parseFloatOrNull(record["3P%"]),
    two_pointers_pg: parseFloatOrNull(record["2P"]),
    two_pointer_attempts_pg: parseFloatOrNull(record["2PA"]),
    two_pointer_percentage: parseFloatOrNull(record["2P%"]),
    effective_field_goal_percentage: parseFloatOrNull(record["eFG%"]),
    free_throws_pg: parseFloatOrNull(record.FT),
    free_throw_attempts_pg: parseFloatOrNull(record.FTA),
    free_throw_percentage: parseFloatOrNull(record["FT%"]),
    offensive_rebounds_pg: parseFloatOrNull(record.ORB),
    defensive_rebounds_pg: parseFloatOrNull(record.DRB),
    total_rebounds_pg: parseFloatOrNull(record.TRB),
    assists_pg: parseFloatOrNull(record.AST),
    steals_pg: parseFloatOrNull(record.STL),
    blocks_pg: parseFloatOrNull(record.BLK),
    turnovers_pg: parseFloatOrNull(record.TOV),
    personal_fouls_pg: parseFloatOrNull(record.PF),
    points_pg: parseFloatOrNull(record.PTS),
    awards: record.Awards === "" ? null : record.Awards,
    player_id: record["Player-additional"] === "" ? null : record["Player-additional"],
  }));

  if (playersToInsert.length > 0) {
    // Knex can handle inserting large arrays automatically
    await knex.batchInsert("player_stats", playersToInsert);
  }
}

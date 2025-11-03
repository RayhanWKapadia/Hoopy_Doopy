import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("player_stats", (table) => {
    table.increments("entry_id").primary(); // Auto-incrementing primary key

    // All columns that might be empty in the text file are now nullable
    table.integer("rk").nullable();
    table.string("player_name").nullable();
    table.integer("age").nullable();
    table.string("team").nullable();
    table.string("position").nullable();
    table.integer("games_played").nullable();
    table.integer("games_started").nullable();
    table.decimal("minutes_played_pg", 4, 1).nullable();
    table.decimal("field_goals_pg", 4, 1).nullable();
    table.decimal("field_goal_attempts_pg", 4, 1).nullable();
    table.decimal("field_goal_percentage", 4, 3).nullable();
    table.decimal("three_pointers_pg", 4, 1).nullable();
    table.decimal("three_pointer_attempts_pg", 4, 1).nullable();
    table.decimal("three_pointer_percentage", 4, 3).nullable();
    table.decimal("two_pointers_pg", 4, 1).nullable();
    table.decimal("two_pointer_attempts_pg", 4, 1).nullable();
    table.decimal("two_pointer_percentage", 4, 3).nullable();
    table.decimal("effective_field_goal_percentage", 4, 3).nullable();
    table.decimal("free_throws_pg", 4, 1).nullable();
    table.decimal("free_throw_attempts_pg", 4, 1).nullable();
    table.decimal("free_throw_percentage", 4, 3).nullable();
    table.decimal("offensive_rebounds_pg", 4, 1).nullable();
    table.decimal("defensive_rebounds_pg", 4, 1).nullable();
    table.decimal("total_rebounds_pg", 4, 1).nullable();
    table.decimal("assists_pg", 4, 1).nullable();
    table.decimal("steals_pg", 4, 1).nullable();
    table.decimal("blocks_pg", 4, 1).nullable();
    table.decimal("turnovers_pg", 4, 1).nullable();
    table.decimal("personal_fouls_pg", 4, 1).nullable();
    table.decimal("points_pg", 4, 1).nullable();
    table.string("awards").nullable();
    table.string("player_id").nullable().index();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("player_stats");
}

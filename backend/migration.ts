import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("player_stats", (table) => {
    table.increments("id").primary(); // auto-increment primary key
    table.integer("rk").notNullable(); // rank
    table.string("player").notNullable();
    table.integer("age");
    table.string("team");
    table.string("pos");
    table.integer("g"); // games played
    table.integer("gs"); // games started
    table.float("mp"); // minutes per game
    table.float("fg"); // field goals
    table.float("fga"); // field goal attempts
    table.float("fg_pct"); // field goal %
    table.float("three_p"); // 3-pointers made
    table.float("three_pa"); // 3-pointers attempted
    table.float("three_pct"); // 3P%
    table.float("two_p"); // 2-pointers made
    table.float("two_pa"); // 2-pointers attempted
    table.float("two_pct"); // 2P%
    table.float("efg_pct"); // effective FG%
    table.float("ft"); // free throws made
    table.float("fta"); // free throws attempted
    table.float("ft_pct"); // free throw %
    table.float("orb"); // offensive rebounds
    table.float("drb"); // defensive rebounds
    table.float("trb"); // total rebounds
    table.float("ast"); // assists
    table.float("stl"); // steals
    table.float("blk"); // blocks
    table.float("tov"); // turnovers
    table.float("pf"); // personal fouls
    table.float("pts"); // points
    table.string("awards"); // awards
    table.string("player_additional"); // additional identifier
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}

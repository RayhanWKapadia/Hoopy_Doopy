import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary(); // auto-increment id
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.string("password_hash").notNullable();
    table.timestamps(true, true); // created_at & updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}

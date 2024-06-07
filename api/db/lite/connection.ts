import knex from "knex";

export const connection = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./db/lite/db.sqlite3",
  },
  useNullAsDefault: true,
});

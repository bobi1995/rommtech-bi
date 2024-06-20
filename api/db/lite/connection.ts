import knex from "knex";

// import path from 'path';
// const dbPath = path.resolve('D:\\Rommtech-BI\\api\\db\\lite\\db.sqlite3');

export const connection = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./db/lite/db.sqlite3",
  },
  useNullAsDefault: true,
});

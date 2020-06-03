import path from "path";
//  npx knex migrate:latest --knexfile knexfile.ts migrate:latest
module.exports = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "src", "database", "database.sqlite"),
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "src", "database", "seeds"),
  },
};

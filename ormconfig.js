require("dotenv").config();

const __prod__ = process.env.NODE_ENV === "production";

module.exports = {
  url: process.env.DATABASE_URL,
  ssl: __prod__
    ? {
        rejectUnauthorized: false,
      }
    : false,
  type: "postgres",
  // host: "localhost",
  // port: 6969,
  // username: "postgres",
  // password: "bhaveek@1234",
  // database: "reddit",
  synchronize: false,
  logging: true,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  seeds: ["src/seeds/**/*{.ts,.js}"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscribers",
  },
};

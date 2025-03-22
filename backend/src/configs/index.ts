export const CONFIG = {
  server: {
    host: "localhost",
    port: 3000,
  },
  db: {
    host: process.env.DB_HOST! || "127.0.0.1",
    user: process.env.DB_USER! || "postgres",
    pass: process.env.DB_PASS! || "secret",
    dbname: process.env.DB_NAME! || "postgres",
    port: process.env.DB_PORT || '5432',
  },
};

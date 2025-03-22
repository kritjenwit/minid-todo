import { defineConfig } from "drizzle-kit";
import { CONFIG } from "./src/configs";
// export default defineConfig({
//   dialect: "postgresql",
//   schema: "./src/databases/schemas",
//   out: "./drizzle",
//   dbCredentials: {
//     host: CONFIG.db.host,
//     user: CONFIG.db.user,
//     password: CONFIG.db.pass,
//     database: CONFIG.db.dbname,
//     port: CONFIG.db.port,
//   }
// });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/databases/schemas",
  out: "./drizzle",
  dbCredentials: {
    host: CONFIG.db.host,
    user: CONFIG.db.user,
    password: CONFIG.db.pass,
    database: CONFIG.db.dbname,
    port: CONFIG.db.port,
  },
});
